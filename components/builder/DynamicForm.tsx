'use client'

import { useState } from 'react'
import { Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react'

// ============================================================================
// DYNAMIC FORM GENERATOR
// Automatically generates form fields from JSON Schema
// This is the "Schema-Driven UI" implementation
// ============================================================================

interface DynamicFormProps {
  schema: any // JSON Schema
  uiSchema?: any // UI hints
  data: Record<string, any>
  onChange: (data: Record<string, any>) => void
}

export function DynamicForm({ schema, uiSchema = {}, data, onChange }: DynamicFormProps) {
  const properties = schema.properties || {}
  const required = schema.required || []

  const handleFieldChange = (fieldName: string, value: any) => {
    onChange({
      ...data,
      [fieldName]: value
    })
  }

  return (
    <div className="space-y-6">
      {Object.entries(properties).map(([fieldName, fieldSchema]: [string, any]) => (
        <FormField
          key={fieldName}
          name={fieldName}
          schema={fieldSchema}
          uiSchema={uiSchema[fieldName] || {}}
          value={data[fieldName]}
          required={required.includes(fieldName)}
          onChange={(value) => handleFieldChange(fieldName, value)}
        />
      ))}
    </div>
  )
}

interface FormFieldProps {
  name: string
  schema: any
  uiSchema: any
  value: any
  required: boolean
  onChange: (value: any) => void
}

function FormField({ name, schema, uiSchema, value, required, onChange }: FormFieldProps) {
  const label = schema.title || name
  const description = schema.description
  const type = schema.type

  // Handle different field types
  if (type === 'array') {
    return (
      <ArrayField
        label={label}
        description={description}
        schema={schema}
        value={value || []}
        required={required}
        onChange={onChange}
      />
    )
  }

  if (type === 'boolean') {
    return (
      <BooleanField
        label={label}
        description={description}
        value={value ?? schema.default ?? false}
        onChange={onChange}
      />
    )
  }

  if (type === 'integer' || type === 'number') {
    return (
      <NumberField
        label={label}
        description={description}
        schema={schema}
        value={value ?? schema.default ?? 0}
        required={required}
        onChange={onChange}
      />
    )
  }

  if (schema.enum) {
    return (
      <SelectField
        label={label}
        description={description}
        options={schema.enum}
        value={value ?? schema.default ?? schema.enum[0]}
        required={required}
        onChange={onChange}
      />
    )
  }

  if (schema.format === 'uri') {
    return (
      <URLField
        label={label}
        description={description}
        value={value ?? schema.default ?? ''}
        required={required}
        onChange={onChange}
      />
    )
  }

  if (schema.format === 'email') {
    return (
      <EmailField
        label={label}
        description={description}
        value={value ?? schema.default ?? ''}
        required={required}
        onChange={onChange}
      />
    )
  }

  if (schema.maxLength && schema.maxLength > 200) {
    return (
      <TextAreaField
        label={label}
        description={description}
        value={value ?? schema.default ?? ''}
        required={required}
        maxLength={schema.maxLength}
        onChange={onChange}
      />
    )
  }

  // Default: text input
  return (
    <TextField
      label={label}
      description={description}
      value={value ?? schema.default ?? ''}
      required={required}
      maxLength={schema.maxLength}
      onChange={onChange}
    />
  )
}

// ============================================================================
// FIELD COMPONENTS
// ============================================================================

function TextField({ label, description, value, required, maxLength, onChange }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {description && <p className="text-xs text-gray-500 mb-2">{description}</p>}
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  )
}

function TextAreaField({ label, description, value, required, maxLength, onChange }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {description && <p className="text-xs text-gray-500 mb-2">{description}</p>}
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        maxLength={maxLength}
        rows={4}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      {maxLength && (
        <p className="text-xs text-gray-400 mt-1">{value.length} / {maxLength}</p>
      )}
    </div>
  )
}

function NumberField({ label, description, schema, value, required, onChange }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {description && <p className="text-xs text-gray-500 mb-2">{description}</p>}
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        min={schema.minimum}
        max={schema.maximum}
        step={schema.type === 'integer' ? 1 : 0.01}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  )
}

function BooleanField({ label, description, value, onChange }: any) {
  return (
    <div className="flex items-start gap-3">
      <input
        type="checkbox"
        checked={value}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
      />
      <div className="flex-1">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
      </div>
    </div>
  )
}

function SelectField({ label, description, options, value, required, onChange }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {description && <p className="text-xs text-gray-500 mb-2">{description}</p>}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {options.map((option: string) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

function URLField({ label, description, value, required, onChange }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {description && <p className="text-xs text-gray-500 mb-2">{description}</p>}
      <input
        type="url"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="https://..."
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  )
}

function EmailField({ label, description, value, required, onChange }: any) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      {description && <p className="text-xs text-gray-500 mb-2">{description}</p>}
      <input
        type="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="email@example.com"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  )
}

// ============================================================================
// ARRAY FIELD (Repeatable Blocks)
// ============================================================================

function ArrayField({ label, description, schema, value, required, onChange }: any) {
  const [collapsed, setCollapsed] = useState<Record<number, boolean>>({})
  const itemSchema = schema.items

  const handleAdd = () => {
    const newItem = getDefaultValue(itemSchema)
    onChange([...value, newItem])
  }

  const handleRemove = (index: number) => {
    onChange(value.filter((_: any, i: number) => i !== index))
  }

  const handleItemChange = (index: number, newValue: any) => {
    const newArray = [...value]
    newArray[index] = newValue
    onChange(newArray)
  }

  const toggleCollapse = (index: number) => {
    setCollapsed(prev => ({ ...prev, [index]: !prev[index] }))
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
          </label>
          {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add
        </button>
      </div>

      <div className="space-y-3">
        {value.map((item: any, index: number) => (
          <div key={index} className="border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between p-3 bg-gray-50">
              <button
                onClick={() => toggleCollapse(index)}
                className="flex items-center gap-2 text-sm font-medium text-gray-700"
              >
                {collapsed[index] ? <ChevronDown className="h-4 w-4" /> : <ChevronUp className="h-4 w-4" />}
                Item {index + 1}
              </button>
              <button
                onClick={() => handleRemove(index)}
                className="p-1 hover:bg-red-100 rounded transition-colors"
              >
                <Trash2 className="h-4 w-4 text-red-600" />
              </button>
            </div>
            {!collapsed[index] && (
              <div className="p-3 space-y-4">
                <DynamicForm
                  schema={itemSchema}
                  data={item}
                  onChange={(newValue) => handleItemChange(index, newValue)}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {value.length === 0 && (
        <p className="text-sm text-gray-500 text-center py-4">No items yet. Click "Add" to create one.</p>
      )}
    </div>
  )
}

// Helper to get default value for a schema
function getDefaultValue(schema: any): any {
  if (schema.default !== undefined) return schema.default
  
  if (schema.type === 'object') {
    const obj: any = {}
    if (schema.properties) {
      Object.entries(schema.properties).forEach(([key, propSchema]: [string, any]) => {
        obj[key] = getDefaultValue(propSchema)
      })
    }
    return obj
  }
  
  if (schema.type === 'array') return []
  if (schema.type === 'boolean') return false
  if (schema.type === 'number' || schema.type === 'integer') return 0
  return ''
}
