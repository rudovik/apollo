import { error } from "console"

export const FormField = ({ id, formdata, change }) => {
  const renderTemplate = () => {
    let formTemplate = null

    const showError = () => {
      let errorMessage = null

      if (formdata.validation && !formdata.valid) {
        errorMessage = (
          <div className="error_label">{formdata.validationMessage}</div>
        )
      }

      return errorMessage
    }

    switch (formdata.element) {
      case "input":
        formTemplate = (
          <div className="formBlock">
            {formdata.showlabel ? (
              <div className="label_inputs">{formdata.config.label}</div>
            ) : null}
            <input
              {...formdata.config}
              value={formdata.value}
              onBlur={(event) => change({ event, id, blur: true })}
              onChange={(event) => change({ event, id })}
            />
            {showError()}
          </div>
        )
        break
      case "select":
        formTemplate = (
          <div className="formBlock">
            {formdata.showlabel ? (
              <div className="label_inputs">{formdata.config.label}</div>
            ) : null}
            <select
              value={formdata.value}
              onBlur={(event) => change({ event, id, blur: true })}
              onChange={(event) => change({ event, id })}
            >
              <option value="">Select one</option>
              {formdata.config.options.map((item) => (
                <option key={item.key} value={item.key}>
                  {item.value}
                </option>
              ))}
            </select>
            {showError()}
          </div>
        )
        break
      case "textarea":
        formTemplate = (
          <div className="formBlock">
            {formdata.showlabel ? (
              <div className="label_inputs">{formdata.config.label}</div>
            ) : null}
            <textarea
              {...formdata.config}
              value={formdata.value}
              onBlur={(event) => change({ event, id, blur: true })}
              onChange={(event) => change({ event, id })}
            ></textarea>
            {showError()}
          </div>
        )
        break
      default:
        formTemplate = null
    }

    return formTemplate
  }

  return <div>{renderTemplate()}</div>
}
