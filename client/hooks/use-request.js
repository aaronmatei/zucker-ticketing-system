import axios from "axios";
import { useState } from "react";

export default ({ url, method, body, onSuccess }) => {
  const [values, setValues] = useState({
    errors: null,
    success: undefined,
  });

  const doRequest = async () => {
    try {
      setValues({ ...values, success: true, errors: null });
      const response = await axios[method](url, body);
      setValues({ ...values, success: true, errors: null });
      if (onSuccess) {
        setTimeout(() => onSuccess(response.data), 2000);
      }
      return response.data;
    } catch (error) {
      console.log("ERROR IN GETTING RES", error);
      setValues({
        ...values,
        success: false,
        errors: (
          <div className="alert alert-danger">
            <h4>Oops....</h4>
            <ul className="my-0">
              {error.response.data.errors.map((err) => (
                <li key={err.message}>{err.message}</li>
              ))}
            </ul>
          </div>
        ),
      });
    }
  };

  return { doRequest, errors: values.errors, success: values.success };
};
