import React, { useState } from 'react'
import { ComboBoxComponent } from "@syncfusion/ej2-react-dropdowns"
import { ButtonComponent } from '@syncfusion/ej2-react-buttons'
import { cn } from '~/lib/utils'
import { showSuccess, showError } from '~/lib/notifications'
import Header from 'components/Header'

const categories = [
  { text: "Medicine", value: "medicine" },
  { text: "Consumable", value: "consumable" },
  { text: "PPE", value: "ppe" },
  { text: "Injectable", value: "injectable" },
]

const AddInventory = () => {
  const [formData, setFormData] = useState({
    itemName: "",
    category: "",
    quantity: 1,
    expiryDate: "",
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!formData.itemName.trim()) {
      showError("Item name is required.")
      return setError("Item name is required.")
    }
    if (!formData.category) {
      showError("Please select a category.")
      return setError("Please select a category.")
    }
    if (formData.quantity < 1) {
      showError("Quantity must be at least 1.")
      return setError("Quantity must be at least 1.")
    }
    if (!formData.expiryDate) {
      showError("Expiry date is required.")
      return setError("Expiry date is required.")
    }

    setLoading(true)
    try {
      // TODO: replace with real API call
      await new Promise((res) => setTimeout(res, 1200))
      showSuccess(`Successfully added ${formData.itemName} to inventory!`)
      // Reset form after successful submission
      setFormData({
        itemName: "",
        category: "",
        quantity: 1,
        expiryDate: "",
      })
    } catch {
      showError("Something went wrong. Please try again.")
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex flex-col gap-10 pb-20 wrapper">
      <Header title="Add New Inventory" description="Add a new item to the inventory system" />

      <section className="mt-2.5 wrapper-md">
        <form className="trip-form" onSubmit={handleSubmit}>

          {/* Item Name */}
          <div>
            <label htmlFor="itemName">Item Name</label>
            <input
              id="itemName"
              name="itemName"
              type="text"
              placeholder="e.g. Surgical Face Masks"
              className="form-input placeholder:text-gray-100"
              value={formData.itemName}
              onChange={(e) => handleChange("itemName", e.target.value)}
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category">Category</label>
            <ComboBoxComponent
              id="category"
              dataSource={categories}
              fields={{ text: "text", value: "value" }}
              placeholder="Select Category"
              className="combo-box"
              change={(e: { value: string | undefined }) => {
                if (e.value) handleChange("category", e.value)
              }}
              allowFiltering
              filtering={(e) => {
                const query = e.text.toLowerCase()
                e.updateData(categories.filter((item) =>
                  item.text.toLowerCase().includes(query)
                ))
              }}
            />
          </div>

          {/* Quantity */}
          <div>
            <label htmlFor="quantity">Quantity</label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              placeholder="Enter quantity"
              className="form-input placeholder:text-gray-100"
              value={formData.quantity}
              onChange={(e) => handleChange("quantity", Number(e.target.value))}
            />
          </div>

          {/* Expiry Date */}
          <div>
            <label htmlFor="expiryDate">Expiry Date</label>
            <input
              id="expiryDate"
              name="expiryDate"
              type="date"
              min={new Date().toISOString().split("T")[0]}
              className="form-input"
              value={formData.expiryDate}
              onChange={(e) => handleChange("expiryDate", e.target.value)}
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
                {loading ? "Saving..." : "Add Inventory Item"}
              </span>
            </ButtonComponent>
          </footer>

        </form>
      </section>
    </main>
  )
}

export default AddInventory