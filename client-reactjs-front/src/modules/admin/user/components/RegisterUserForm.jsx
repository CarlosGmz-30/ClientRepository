import {
  Button,
  Label,
  Modal,
  Select,
  TextInput,
  Datepicker,
  FileInput
} from "flowbite-react";
import { useFormik } from "formik";
import React from "react";
import * as yup from "yup";
import { confirmAlert, customAlert } from "../../../../config/alerts/alert";
import AxiosClient from "../../../../config/http-client/axios-client";


const RegisterUserForm = ({ isCreating, setIsCreating, getAllUsers }) => {
  const closeModal = () => {
    setIsCreating(false);
  };

  const handleChangeAvatar = (event) => {
    //files, files[0]
    console.log(files);
    const files = event.target.files;
    for (const file of files) {
      const reader = new FileReader();
      reader.onloadend = (data) => {

        formik.setFieldTouched('avatar', true);
        formik.setFieldValue('avatar', data.result)
      }
      reader.readAsDataURL(file);
    }
  }

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmPassword: "",
      roles: "",
      name: "",
      surname: "",
      lastname: "",
      curp: "",
      birth_date: "",
      avatar: "",
    },
    validationSchema: yup.object().shape({
      username: yup
        .string()
        .required("Campo obligatorio")
        .min(3, "Minimo 3 caracteres")
        .max(45, "Maximo 45 caracteres"),
      password: yup
        .string()
        .required("Campo obligatorio")
        .min(8, "Minimo 8 caracteres")
        .max(45, "Maximo 45 caracteres"),
      confirmPassword: yup
        .string()
        .required("Campo obligatorio")
        .min(8, "Minimo 8 caracteres")
        .max(45, "Maximo 45 caracteres")
        .test(
          "password-matches",
          "Las contraseñas no coinciden",
          function (value) {
            return value === this.parent.password;
          }
        ),
      name: yup
        .string()
        .required("Campo obligatorio")
        .min(3, "Minimo 3 caracteres")
        .max(45, "Maximo 45 caracteres"),
      surname: yup
        .string()
        .required("Campo obligatorio")
        .min(3, "Minimo 3 caracteres")
        .max(45, "Maximo 45 caracteres"),
      lastname: yup
        .string()
        .min(3, "Minimo 3 caracteres")
        .max(45, "Maximo 45 caracteres"),
      curp: yup
        .string()
        .required("Campo obligatorio")
        .min(3, "Minimo 18 caracteres")
        .max(18, "Maximo 18 caracteres"),
      birth_date: yup.string().required("Campo obligatorio"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      confirmAlert(async () => {
        try {
          const payload = {
            ...values,
            birthDate: values.birth_date,
            user: {
              username: values.username,
              avatar: values.avatar,
              password: values.password,
              roles: [{ id: values.roles }]
            }
          }
          const response = await AxiosClient({
            method: "POST",
            url: '/person/',
            data: payload
          })
          if (!response.error) {
            customAlert('Registro exitoso', 'El usuario se ha registrado correctamente', 'success')
            getAllUsers();
            closeModal();
          }
        } catch (error) {
          customAlert('Ocurrio un error', 'Error al registrar al usuario', 'error');
          console.log(error)
        } finally {
          setSubmitting(false);
        }
      })
    },
  });

  return (
    <Modal onClose={() => closeModal()} show={isCreating} size={"4xl"}>
      <Modal.Header>
        <h3 className="font-bold">Registro de usuario</h3>
      </Modal.Header>
      <Modal.Body>
        <form id="userForm" name="userForm" noValidate onSubmit={formik.handleSubmit}>
          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-2xl">Datos de usuario</h3>
            <div className="grid grid-flow-col gap-2 mt-4">
              <div className="grid-col-5">
                <Label
                  htmlFor="username"
                  className="font-bold"
                  value="Usuario"
                />
                <TextInput
                  type="text"
                  placeholder="Usuario"
                  id="username"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched.username &&
                    formik.errors.username && (
                      <span classname="text-red-600">
                        {formik.errors.username}
                      </span>
                    )
                  }
                />
              </div>
              <div className="grid-col-7">
                <Label htmlFor="roles" className="font-bold" value="Roles" />
                <Select
                  placeholder="Seleccionar rol..."
                  id="roles"
                  name="roles"
                  value={formik.values.roles}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched.roles &&
                    formik.errors.roles && (
                      <span classname="text-red-600">
                        {formik.errors.roles}
                      </span>
                    )
                  }
                >
                  <option value="1">ADMIN</option>
                  <option value="2">USER</option>
                  <option value="3">CLIENT</option>
                </Select>
              </div>
            </div>
            <div className="grid grid-flow-col gap-2 mb-4">
              <div className="grid-col-6">
                <Label
                  htmlFor="password"
                  className="font-bold"
                  value="Contraseña"
                />
                <TextInput
                  type="password"
                  placeholder="Contraseña"
                  id="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched.password &&
                    formik.errors.password && (
                      <span classname="text-red-600">
                        {formik.errors.password}
                      </span>
                    )
                  }
                />
              </div>
              <div className="grid-col-6">
                <Label
                  htmlFor="confirmPassword"
                  className="font-bold"
                  value="Confirmar contraseña"
                />
                <TextInput
                  type="password"
                  placeholder="Contraseña"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <span className="text-red-600">
                        {formik.errors.confirmPassword}
                      </span>
                    )
                  }
                />
              </div>
            </div>
            <div className="grid grid-flow-col gap-2 mb-4">
              <div className="grid-col-5">
                <Label htmlFor="avatar" className="font-bold" value="Avatar" />
                <FileInput type="file" id="avatar" name="avatar" onChange={(e) => handleChangeAvatar(e)} />
              </div>
            </div>
            <h3 className="font-bold text-2xl">Datos personales</h3>
            <div className="grid grid-flow-col gap-2 mt-4">
              <div className="grid-col-4">
                <Label htmlFor="name" className="font-bold" value="Nombre" />
                <TextInput
                  type="text"
                  placeholder="Carlos"
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched.name &&
                    formik.errors.name && (
                      <span classname="text-red-600">{formik.errors.name}</span>
                    )
                  }
                />
              </div>
              <div className="grid-col-4">
                <Label htmlFor="surname" className="font-bold" value="Apellido paterno" />
                <TextInput
                  type="text"
                  placeholder="Martinez"
                  id="surname"
                  name="surname"
                  value={formik.values.surname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched.surname &&
                    formik.errors.surname && (
                      <span classname="text-red-600">{formik.errors.surname}</span>
                    )
                  }
                />
              </div>
              <div className="grid-col-4">
                <Label
                  htmlFor="lastname"
                  className="font-bold"
                  value="Apellido materno"
                />
                <TextInput
                  type="text"
                  placeholder="Gomez"
                  id="lastname"
                  name="lastname"
                  value={formik.values.lastname}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched.lastname &&
                    formik.errors.lastname && (
                      <span classname="text-red-600">{formik.errors.lastname}</span>
                    )
                  }
                />
              </div>
            </div>
            <div className="grid grid-flow-col gap-2">
              <div className="grid-col-6">
                <Label htmlFor="curp" className="font-bold" value="CURP" />
                <TextInput
                  type="curp"
                  placeholder="MGCH200504HDFRRR02"
                  id="curp"
                  name="curp"
                  value={formik.values.curp}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched.curp &&
                    formik.errors.curp && (
                      <span classname="text-red-600">{formik.errors.curp}</span>
                    )
                  }
                />
              </div>
              <div className="grid-col-6">
                <Label
                  htmlFor="birth_date"
                  className="font-bold"
                  value="Fecha de nacimiento"
                />
                <TextInput
                  type="date"
                  id="birth_date"
                  name="birth_date"
                  value={formik.values.birth_date}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  helperText={
                    formik.touched.birth_date &&
                    formik.errors.birth_date && (
                      <span classname="text-red-600">{formik.errors.birth_date}</span>
                    )}
                />
              </div>
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer className="flex justify-end gap-2">
        <Button onClick={closeModal} color="gray">CANCELAR</Button>
        <Button type="submit" form="userForm" color="success" disabled={formik.isSubmitting || !formik.isValid}>GUARDAR</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RegisterUserForm;
