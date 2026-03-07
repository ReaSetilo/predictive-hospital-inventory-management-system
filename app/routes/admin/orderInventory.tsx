import React, { useState } from 'react' 
import {ComboBoxComponent} from "@syncfusion/ej2-react-dropdowns";
import {ButtonComponent} from "@syncfusion/ej2-react-buttons";
import Header from 'components/Header'
import { cn } from '~/lib/utils'
const oderInventory = () => {
  const handleSubmit = async () => {};
  const [formData, setFormData] = useState({
  name: "",
  category: "",
  quantity: 1
});

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };
const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  return (
    <main className="flex flex-col gap-10 pb-20 wrapper">
      <Header title="Order new inventory" description="replenish inventory" />
      <section className="mt-2.5 wrapper-md">
      <form className="trip-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Item Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter inventory item name"
            className="form-input placeholder:text-gray-100"
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="category">Category</label>
          <ComboBoxComponent
            id="category"
            dataSource={[
              { text: "Medicine", value: "medicine" },
              { text: "Consumable", value: "consumable" },
              { text: "PPE", value: "ppe" },
              { text: "Injectable", value: "injectable" },
            ]}
            fields={{ text: "text", value: "value" }}
            placeholder="Select Category"
            className="combo-box"
            change={(e: { value: string | undefined }) => {
              if (e.value) {
                handleChange("category", e.value);
              }
            }}
            allowFiltering
            filtering={(e) => {
              const items = [
                { text: "Medicine", value: "medicine" },
                { text: "Consumable", value: "consumable" },
                { text: "PPE", value: "ppe" },
                { text: "Injectable", value: "injectable" },
              ];

              const query = e.text.toLowerCase();

              e.updateData(
                items.filter((item) =>
                  item.text.toLowerCase().includes(query)
                )
              );
            }}
          />
        </div>

        <div>
          <label htmlFor="quantity">Quantity</label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min="1"
            placeholder="Enter quantity"
            className="form-input placeholder:text-gray-100"
            onChange={(e) => handleChange("quantity", Number(e.target.value))}
          />
        </div>

        <div className="bg-gray-200 h-px w-full" />

        {error && (
          <div className="error">
            <p>{error}</p>
          </div>
        )}

        <footer className="px-6 w-full">
          <ButtonComponent
            type="submit"
            className="button-class !h-12 !w-full"
            disabled={loading}
          >
            <img
              src={`/assets/icons/${loading ? "loader.svg" : "plus.svg"}`}
              className={cn("size-5", { "animate-spin": loading })}
            />
            <span className="p-16-semibold text-white">
              {loading ? "Submitting..." : "Place Order"}
            </span>
          </ButtonComponent>
        </footer>
      </form>
    </section>
    </main>
  )
}

export default oderInventory
