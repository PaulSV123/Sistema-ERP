import React, { useState } from "react";

const useForm = (initialForm,validateForm) => {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleChecked = (e) =>{
    setForm({
        //mezaclamos el objeto q trae el form con la propiedad, si ya existe la actualiza
        ...form,
        [e.target.name]:e.target.checked,//destructuracion
    });
};

const handleFiled = (e)=>{
  
    setForm({
      //mezaclamos el objeto q trae el form con la propiedad, si ya existe la actualiza
      ...form,
      [e.target.name]:e.target.files[0],//destructuracion
    });
  
  
}


  const handleBlur = (e) => {
    handleChange(e);
    setErrors(validateForm(form));
};

  return { form, setForm, handleChange,handleChecked,handleFiled,  errors,handleBlur,setErrors};
};

export default useForm;
