-- ============================================================
-- MEDICAL INVENTORY MANAGEMENT SYSTEM
-- Full PostgreSQL Schema with Notifications
-- ============================================================


-- ============================================================
-- 1. INVENTORY
-- ============================================================
CREATE SEQUENCE inventory_id_seq START 1 INCREMENT 1;

CREATE TABLE inventory (
    id            VARCHAR(10)  PRIMARY KEY
                  DEFAULT ('inv_' || LPAD(nextval('inventory_id_seq')::TEXT, 3, '0')),
    item_name     VARCHAR(255) NOT NULL,
    category      VARCHAR(50)  NOT NULL
                  CHECK (category IN ('ppe', 'medicine', 'consumable', 'injectable')),
    quantity      INTEGER      NOT NULL DEFAULT 0 CHECK (quantity >= 0),
    reorder_point INTEGER,     -- triggers 'Low' notification
    safety_stock  INTEGER,     -- triggers 'Critical' notification
    expiry_date   DATE,
    created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);


-- ============================================================
-- 2. SUPPLIERS
-- ============================================================
CREATE TABLE suppliers (
    id         SERIAL       PRIMARY KEY,
    name       VARCHAR(255) NOT NULL,
    address    VARCHAR(500),
    phone      VARCHAR(30),
    email      VARCHAR(255),
    created_at TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);


-- ============================================================
-- 3. PURCHASE ORDERS
--    Format: PO-YYYYMMDD-XXXX
-- ============================================================
CREATE SEQUENCE po_id_seq START 1 INCREMENT 1;

CREATE TABLE purchase_orders (
    id             SERIAL       PRIMARY KEY,
    order_number   VARCHAR(25)  UNIQUE NOT NULL
                   DEFAULT ('PO-' || TO_CHAR(NOW(), 'YYYYMMDD') || '-' ||
                            LPAD(nextval('po_id_seq')::TEXT, 4, '0')),
    supplier_id    INTEGER      NOT NULL REFERENCES suppliers(id) ON DELETE RESTRICT,
    order_date     DATE         NOT NULL DEFAULT CURRENT_DATE,
    expected_delivery_date DATE,
    location       VARCHAR(255),
    payment_method VARCHAR(50)  CHECK (payment_method IN ('CASH', 'CREDIT', 'BANK_TRANSFER', 'CHEQUE')),
    status         VARCHAR(20)  NOT NULL DEFAULT 'Pending'
                   CHECK (status IN ('Pending', 'Confirmed', 'Received', 'Cancelled')),
    created_by     VARCHAR(255),
    total_amount   NUMERIC(12,2) NOT NULL DEFAULT 0.00,
    created_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);


-- ============================================================
-- 4. PURCHASE ORDER ITEMS
-- ============================================================
CREATE TABLE purchase_order_items (
    id            SERIAL        PRIMARY KEY,
    order_id      INTEGER       NOT NULL REFERENCES purchase_orders(id) ON DELETE CASCADE,
    inventory_id  VARCHAR(10)   REFERENCES inventory(id) ON DELETE SET NULL,
    item_name     VARCHAR(255)  NOT NULL,   -- denormalized for historical accuracy
    category      VARCHAR(50)   NOT NULL,
    quantity      INTEGER       NOT NULL CHECK (quantity > 0),
    unit_price    NUMERIC(10,2),
    line_total    NUMERIC(10,2) GENERATED ALWAYS AS (quantity * unit_price) STORED,
    created_at    TIMESTAMPTZ   NOT NULL DEFAULT NOW()
);


-- ============================================================
-- 5. OUTGOING ORDERS (department requests)
--    Format: PPE-20260409-4356, MED-20260408-1234, etc.
--    order_number set in application layer (needs category prefix)
-- ============================================================
CREATE SEQUENCE outgoing_id_seq START 1 INCREMENT 1;

CREATE TABLE outgoing_orders (
    id            SERIAL       PRIMARY KEY,
    order_number  VARCHAR(25)  UNIQUE NOT NULL,
    order_date    DATE         NOT NULL DEFAULT CURRENT_DATE,
    inventory_id  VARCHAR(10)  REFERENCES inventory(id) ON DELETE SET NULL,
    category      VARCHAR(50)  NOT NULL,
    quantity      INTEGER      NOT NULL CHECK (quantity > 0),
    status        VARCHAR(20)  NOT NULL DEFAULT 'Pending'
                  CHECK (status IN ('Pending', 'Approved', 'Shipped', 'Delivered', 'Cancelled')),
    created_by    VARCHAR(255),
    created_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);


-- ============================================================
-- 6. INVENTORY CONSUMPTION
--    Tracks actual usage — drives "Top Consumption This Week"
-- ============================================================
CREATE TABLE inventory_consumption (
    id            SERIAL      PRIMARY KEY,
    inventory_id  VARCHAR(10) NOT NULL REFERENCES inventory(id) ON DELETE CASCADE,
    quantity_used INTEGER     NOT NULL CHECK (quantity_used > 0),
    consumed_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    notes         TEXT
);


-- ============================================================
-- 7. NOTIFICATION TYPES
-- ============================================================
CREATE TABLE notification_types (
    id          SERIAL      PRIMARY KEY,
    code        VARCHAR(50) UNIQUE NOT NULL,
    label       VARCHAR(100) NOT NULL,
    description TEXT,
    severity    VARCHAR(20) NOT NULL DEFAULT 'info'
                CHECK (severity IN ('info', 'warning', 'critical', 'success'))
);

INSERT INTO notification_types (code, label, description, severity) VALUES
    ('ORDER_PENDING',       'Order Pending',        'A new purchase order awaits approval',              'info'),
    ('ORDER_CONFIRMED',     'Order Confirmed',       'A purchase order has been confirmed',               'success'),
    ('ORDER_RECEIVED',      'Order Received',        'A purchase order has been received',                'success'),
    ('ORDER_CANCELLED',     'Order Cancelled',       'A purchase order has been cancelled',               'warning'),
    ('OUTGOING_APPROVED',   'Outgoing Approved',     'An outgoing order has been approved for dispatch',  'success'),
    ('OUTGOING_CANCELLED',  'Outgoing Cancelled',    'An outgoing order has been cancelled',              'warning'),
    ('STOCK_LOW',           'Stock Low',             'Item stock has fallen below reorder point',         'warning'),
    ('STOCK_CRITICAL',      'Stock Critical',        'Item stock has fallen below safety stock level',    'critical'),
    ('STOCK_OUT',           'Out of Stock',          'Item quantity has reached zero',                    'critical'),
    ('EXPIRY_SOON',         'Expiring Soon',         'Item is expiring within 30 days',                  'warning'),
    ('EXPIRY_CRITICAL',     'Expiring Very Soon',    'Item is expiring within 10 days',                  'critical'),
    ('ITEM_EXPIRED',        'Item Expired',          'An inventory item has passed its expiry date',      'critical');


-- ============================================================
-- 8. NOTIFICATIONS
-- ============================================================
CREATE TABLE notifications (
    id                   SERIAL       PRIMARY KEY,
    notification_type_id INTEGER      NOT NULL REFERENCES notification_types(id),

    -- Context — only the relevant FK is populated
    inventory_id         VARCHAR(10)  REFERENCES inventory(id) ON DELETE CASCADE,
    purchase_order_id    INTEGER      REFERENCES purchase_orders(id) ON DELETE CASCADE,
    outgoing_order_id    INTEGER      REFERENCES outgoing_orders(id) ON DELETE CASCADE,

    title                VARCHAR(255) NOT NULL,
    message              TEXT         NOT NULL,
    is_read              BOOLEAN      NOT NULL DEFAULT FALSE,
    read_at              TIMESTAMPTZ,

    -- NULL = visible to all; set to restrict to a user or role
    target_user          VARCHAR(100),
    target_role          VARCHAR(50),

    created_at           TIMESTAMPTZ  NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- ============================================================
-- 9. INDEXES
-- ============================================================
CREATE INDEX idx_inventory_category          ON inventory(category);
CREATE INDEX idx_inventory_expiry_date       ON inventory(expiry_date);
CREATE INDEX idx_po_status                   ON purchase_orders(status);
CREATE INDEX idx_po_order_date               ON purchase_orders(order_date);
CREATE INDEX idx_po_supplier                 ON purchase_orders(supplier_id);
CREATE INDEX idx_po_items_order_id           ON purchase_order_items(order_id);
CREATE INDEX idx_outgoing_status             ON outgoing_orders(status);
CREATE INDEX idx_outgoing_order_date         ON outgoing_orders(order_date);
CREATE INDEX idx_consumption_inventory_id    ON inventory_consumption(inventory_id);
CREATE INDEX idx_consumption_consumed_at     ON inventory_consumption(consumed_at);
CREATE INDEX idx_notifications_is_read       ON notifications(is_read);
CREATE INDEX idx_notifications_created_at    ON notifications(created_at DESC);
CREATE INDEX idx_notifications_target_user   ON notifications(target_user);
CREATE INDEX idx_notifications_inventory     ON notifications(inventory_id);
CREATE INDEX idx_notifications_po            ON notifications(purchase_order_id);
CREATE INDEX idx_notifications_outgoing      ON notifications(outgoing_order_id);


-- ============================================================
-- 10. SHARED updated_at TRIGGER FUNCTION
-- ============================================================
CREATE OR REPLACE FUNCTION fn_set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_inventory_updated_at
    BEFORE UPDATE ON inventory
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

CREATE TRIGGER trg_suppliers_updated_at
    BEFORE UPDATE ON suppliers
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

CREATE TRIGGER trg_po_updated_at
    BEFORE UPDATE ON purchase_orders
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();

CREATE TRIGGER trg_outgoing_updated_at
    BEFORE UPDATE ON outgoing_orders
    FOR EACH ROW EXECUTE FUNCTION fn_set_updated_at();


-- ============================================================
-- 11. TRIGGER: Purchase order status → notification
-- ============================================================
CREATE OR REPLACE FUNCTION fn_notify_purchase_order_status()
RETURNS TRIGGER AS $$
DECLARE
    v_type_id INTEGER;
    v_code    TEXT;
BEGIN
    IF (TG_OP = 'UPDATE' AND OLD.status = NEW.status) THEN
        RETURN NEW;
    END IF;

    v_code := CASE NEW.status
        WHEN 'Pending'   THEN 'ORDER_PENDING'
        WHEN 'Confirmed' THEN 'ORDER_CONFIRMED'
        WHEN 'Received'  THEN 'ORDER_RECEIVED'
        WHEN 'Cancelled' THEN 'ORDER_CANCELLED'
        ELSE NULL
    END;

    IF v_code IS NULL THEN RETURN NEW; END IF;

    SELECT id INTO v_type_id FROM notification_types WHERE code = v_code;

    INSERT INTO notifications (notification_type_id, purchase_order_id, title, message)
    VALUES (
        v_type_id,
        NEW.id,
        'Purchase Order ' || NEW.status || ': ' || NEW.order_number,
        'Order ' || NEW.order_number || ' has been ' || LOWER(NEW.status) ||
        ' on ' || TO_CHAR(NOW(), 'Mon DD, YYYY HH24:MI') || '.'
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_po_status_notification
    AFTER INSERT OR UPDATE OF status ON purchase_orders
    FOR EACH ROW EXECUTE FUNCTION fn_notify_purchase_order_status();


-- ============================================================
-- 12. TRIGGER: Outgoing order status → notification
-- ============================================================
CREATE OR REPLACE FUNCTION fn_notify_outgoing_order_status()
RETURNS TRIGGER AS $$
DECLARE
    v_type_id INTEGER;
    v_code    TEXT;
BEGIN
    IF (TG_OP = 'UPDATE' AND OLD.status = NEW.status) THEN
        RETURN NEW;
    END IF;

    v_code := CASE NEW.status
        WHEN 'Approved'  THEN 'OUTGOING_APPROVED'
        WHEN 'Cancelled' THEN 'OUTGOING_CANCELLED'
        ELSE NULL
    END;

    IF v_code IS NULL THEN RETURN NEW; END IF;

    SELECT id INTO v_type_id FROM notification_types WHERE code = v_code;

    INSERT INTO notifications (notification_type_id, outgoing_order_id, title, message)
    VALUES (
        v_type_id,
        NEW.id,
        'Outgoing Order ' || NEW.status || ': ' || NEW.order_number,
        'Order ' || NEW.order_number || ' (' || NEW.category ||
        ', qty: ' || NEW.quantity || ') has been ' || LOWER(NEW.status) ||
        ' on ' || TO_CHAR(NOW(), 'Mon DD, YYYY HH24:MI') || '.'
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_outgoing_status_notification
    AFTER INSERT OR UPDATE OF status ON outgoing_orders
    FOR EACH ROW EXECUTE FUNCTION fn_notify_outgoing_order_status();


-- ============================================================
-- 13. TRIGGER: Inventory quantity drop → stock level notification
-- ============================================================
CREATE OR REPLACE FUNCTION fn_notify_inventory_stock()
RETURNS TRIGGER AS $$
DECLARE
    v_type_id INTEGER;
    v_code    TEXT;
    v_title   TEXT;
    v_message TEXT;
BEGIN
    -- Only act on quantity decreases
    IF NEW.quantity >= OLD.quantity THEN
        RETURN NEW;
    END IF;

    -- Most critical threshold wins
    IF NEW.quantity = 0 THEN
        v_code := 'STOCK_OUT';
    ELSIF NEW.safety_stock IS NOT NULL AND NEW.quantity <= NEW.safety_stock THEN
        v_code := 'STOCK_CRITICAL';
    ELSIF NEW.reorder_point IS NOT NULL AND NEW.quantity <= NEW.reorder_point THEN
        v_code := 'STOCK_LOW';
    ELSE
        RETURN NEW;
    END IF;

    -- Deduplicate: skip if same unread notification already exists within 24 hours
    IF EXISTS (
        SELECT 1 FROM notifications n
        JOIN notification_types nt ON n.notification_type_id = nt.id
        WHERE n.inventory_id = NEW.id
          AND nt.code = v_code
          AND n.is_read = FALSE
          AND n.created_at > NOW() - INTERVAL '24 hours'
    ) THEN
        RETURN NEW;
    END IF;

    SELECT id INTO v_type_id FROM notification_types WHERE code = v_code;

    v_title := CASE v_code
        WHEN 'STOCK_OUT'      THEN 'Out of Stock: '   || NEW.item_name
        WHEN 'STOCK_CRITICAL' THEN 'Critical Stock: ' || NEW.item_name
        WHEN 'STOCK_LOW'      THEN 'Low Stock: '      || NEW.item_name
    END;

    v_message := NEW.item_name || ' stock is now ' || NEW.quantity || ' units. ' ||
        CASE v_code
            WHEN 'STOCK_OUT'      THEN 'Item is completely out of stock. Immediate reorder required.'
            WHEN 'STOCK_CRITICAL' THEN 'Stock is below safety level (' || NEW.safety_stock || ' units). Reorder urgently.'
            WHEN 'STOCK_LOW'      THEN 'Stock is below reorder point (' || NEW.reorder_point || ' units). Consider restocking.'
        END;

    INSERT INTO notifications (notification_type_id, inventory_id, title, message)
    VALUES (v_type_id, NEW.id, v_title, v_message);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_inventory_stock_notification
    AFTER UPDATE OF quantity ON inventory
    FOR EACH ROW EXECUTE FUNCTION fn_notify_inventory_stock();


-- ============================================================
-- 14. FUNCTION: Expiry checks
--     Call daily via pg_cron or your app scheduler:
--     SELECT fn_check_expiry_notifications();
-- ============================================================
CREATE OR REPLACE FUNCTION fn_check_expiry_notifications()
RETURNS void AS $$
DECLARE
    rec       RECORD;
    v_type_id INTEGER;
    v_code    TEXT;
BEGIN
    -- Items expiring within 30 days (still valid, still in stock)
    FOR rec IN
        SELECT id, item_name, expiry_date,
               (expiry_date - CURRENT_DATE) AS days_left
        FROM inventory
        WHERE expiry_date IS NOT NULL
          AND expiry_date >= CURRENT_DATE
          AND quantity > 0
          AND (expiry_date - CURRENT_DATE) <= 30
    LOOP
        v_code := CASE WHEN rec.days_left <= 10 THEN 'EXPIRY_CRITICAL' ELSE 'EXPIRY_SOON' END;

        CONTINUE WHEN EXISTS (
            SELECT 1 FROM notifications n
            JOIN notification_types nt ON n.notification_type_id = nt.id
            WHERE n.inventory_id = rec.id
              AND nt.code = v_code
              AND n.created_at > NOW() - INTERVAL '24 hours'
        );

        SELECT id INTO v_type_id FROM notification_types WHERE code = v_code;

        INSERT INTO notifications (notification_type_id, inventory_id, title, message)
        VALUES (
            v_type_id,
            rec.id,
            CASE v_code
                WHEN 'EXPIRY_CRITICAL' THEN 'Expiring in ' || rec.days_left || ' days: ' || rec.item_name
                ELSE                        'Expiring Soon (' || rec.days_left || 'd): ' || rec.item_name
            END,
            rec.item_name || ' expires on ' || TO_CHAR(rec.expiry_date, 'Mon DD, YYYY') ||
            ' (' || rec.days_left || ' days remaining). Please review and action stock.'
        );
    END LOOP;

    -- Items already expired but still showing quantity > 0
    FOR rec IN
        SELECT id, item_name, expiry_date
        FROM inventory
        WHERE expiry_date IS NOT NULL
          AND expiry_date < CURRENT_DATE
          AND quantity > 0
    LOOP
        CONTINUE WHEN EXISTS (
            SELECT 1 FROM notifications n
            JOIN notification_types nt ON n.notification_type_id = nt.id
            WHERE n.inventory_id = rec.id
              AND nt.code = 'ITEM_EXPIRED'
              AND n.created_at > NOW() - INTERVAL '24 hours'
        );

        SELECT id INTO v_type_id FROM notification_types WHERE code = 'ITEM_EXPIRED';

        INSERT INTO notifications (notification_type_id, inventory_id, title, message)
        VALUES (
            v_type_id,
            rec.id,
            'Expired Item in Stock: ' || rec.item_name,
            rec.item_name || ' expired on ' || TO_CHAR(rec.expiry_date, 'Mon DD, YYYY') ||
            '. Remove from active inventory immediately.'
        );
    END LOOP;
END;
$$ LANGUAGE plpgsql;


-- ============================================================
-- 15. VIEWS
-- ============================================================

-- Unread notifications feed (UI bell icon), sorted by severity then recency
CREATE VIEW v_unread_notifications AS
SELECT
    n.id,
    nt.severity,
    nt.code        AS type_code,
    nt.label       AS type_label,
    n.title,
    n.message,
    n.target_user,
    n.target_role,
    n.created_at,
    n.purchase_order_id,
    po.order_number  AS purchase_order_number,
    n.outgoing_order_id,
    oo.order_number  AS outgoing_order_number,
    n.inventory_id,
    i.item_name      AS inventory_item_name
FROM notifications n
JOIN notification_types  nt ON n.notification_type_id = nt.id
LEFT JOIN purchase_orders po ON n.purchase_order_id   = po.id
LEFT JOIN outgoing_orders oo ON n.outgoing_order_id   = oo.id
LEFT JOIN inventory        i ON n.inventory_id         = i.id
WHERE n.is_read = FALSE
ORDER BY
    CASE nt.severity
        WHEN 'critical' THEN 1
        WHEN 'warning'  THEN 2
        WHEN 'success'  THEN 3
        WHEN 'info'     THEN 4
    END,
    n.created_at DESC;


-- Inventory status view (Image 4 — Critical / Low / OK + days left)
CREATE VIEW inventory_status AS
SELECT
    i.id,
    i.item_name,
    i.category,
    i.quantity AS stock,
    i.reorder_point,
    i.safety_stock,
    i.expiry_date,
    COALESCE(
        i.quantity / NULLIF(
            (
                SELECT ROUND(AVG(daily.daily_usage))
                FROM (
                    SELECT DATE(consumed_at) AS day,
                           SUM(quantity_used) AS daily_usage
                    FROM inventory_consumption
                    WHERE inventory_id = i.id
                      AND consumed_at >= NOW() - INTERVAL '30 days'
                    GROUP BY DATE(consumed_at)
                ) daily
            ), 0
        ), NULL
    ) AS days_left,
    CASE
        WHEN i.quantity = 0                                                      THEN 'Out of Stock'
        WHEN i.safety_stock  IS NOT NULL AND i.quantity <= i.safety_stock        THEN 'Critical'
        WHEN i.reorder_point IS NOT NULL AND i.quantity <= i.reorder_point       THEN 'Low'
        WHEN i.quantity < 150                                                    THEN 'Critical'
        WHEN i.quantity < 400                                                    THEN 'Low'
        ELSE 'OK'
    END AS status
FROM inventory i;


-- Weekly top consumption (Image 5 bar chart)
CREATE VIEW weekly_top_consumption AS
SELECT
    i.item_name,
    SUM(ic.quantity_used) AS total_usage
FROM inventory_consumption ic
JOIN inventory i ON ic.inventory_id = i.id
WHERE ic.consumed_at >= DATE_TRUNC('week', NOW())
  AND ic.consumed_at <  DATE_TRUNC('week', NOW()) + INTERVAL '7 days'
GROUP BY i.id, i.item_name
ORDER BY total_usage DESC;


-- Dashboard KPIs (Image 1 stat cards)
CREATE VIEW dashboard_kpis AS
SELECT
    (SELECT COUNT(*)   FROM inventory)                                              AS total_items_count,
    (SELECT SUM(quantity) FROM inventory)                                           AS total_items_quantity,
    (SELECT COUNT(*)   FROM inventory
     WHERE expiry_date BETWEEN NOW() AND NOW() + INTERVAL '30 days')               AS expiring_soon,
    (SELECT COUNT(*)   FROM inventory_status WHERE days_left <= 10
     OR status IN ('Critical', 'Out of Stock'))                                     AS predicted_shortages,
    (SELECT COUNT(*)   FROM purchase_orders WHERE status = 'Pending')              AS pending_orders,
    (SELECT COUNT(*)   FROM purchase_orders WHERE status = 'Confirmed')            AS approved_orders;