import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Button } from "@material-tailwind/react";
import React from "react";

import type { UserProps } from "@/pages/user/index";

type AddUserProps = {
  setAddUser: React.Dispatch<React.SetStateAction<boolean>>;
  pagData: {}[][];
  setPagData: React.Dispatch<React.SetStateAction<{}[][]>>;
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  editValue: any;
  setEditValue: React.Dispatch<React.SetStateAction<any>>;
  temp: UserProps[];
};

type onSubmitProps = (data: any) => Promise<void>;

const AddUser = ({
  setAddUser,
  pagData,
  setPagData,
  edit,
  setEdit,
  editValue,
  setEditValue,
  temp,
}: AddUserProps) => {
  const initialValues = {
    name: "",
    email: "",
    gender: "",
    status: "",
  };

  const onSubmit: onSubmitProps = async (data) => {
    if (editValue != null) {
      const dataSubmit = {
        ...data,
        id: editValue.id,
      };

      const res = await window.fetch(
        `https://gorest.co.in/public/v1/users/${editValue.id}`,
        {
          method: "PATCH",
          credentials: "same-origin",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer baab25ae311ca6c3737a36fc87d76b24da71f067d290a965dea6eb07cd04b6de",
          },
          body: JSON.stringify(dataSubmit),
        }
      );

      const arr = temp;
      const index = arr.findIndex((item) => item.name == editValue.name);
      arr.splice(index, 1);
      arr.unshift(dataSubmit);

      const dummy = [];
      let numDummy = 1;
      for (let i = 0; i < arr.length; i += 20) {
        dummy.push(arr.slice(i, 20 * numDummy));
        numDummy++;
      }
      setPagData([...dummy]);
    } else {
      const res = await window.fetch("https://gorest.co.in/public/v1/users", {
        method: "POST",
        credentials: "same-origin",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer baab25ae311ca6c3737a36fc87d76b24da71f067d290a965dea6eb07cd04b6de",
        },
        body: JSON.stringify(data),
      });

      const pagDataLength = pagData.length;
      if (pagData[pagDataLength - 1].length >= 20) {
        pagData.push([data]);
      } else {
        pagData[pagDataLength - 1].push(data);
      }
      setPagData([...pagData]);
    }

    setAddUser(false);
    setEdit(false);
    setEditValue(null);
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3).max(75).required("name is required field"),
    email: Yup.string()
      .email("Invalid email")
      .required("email is required field"),
    gender: Yup.string().required("gender is required field"),
    status: Yup.string().required("status is required field"),
  });

  return (
    <div className="mx-auto text-center my-10">
      <Button
        className="ring-1 ring-gray-600 px-5 text-gray-700 py-2 rounded-xl mx-auto hover:bg-gray-700 hover:text-gray-100 "
        onClick={() => {
          setAddUser(false);
          setEdit(false);
          setEditValue(null);
        }}
      >
        {edit ? "Cancel Edit" : "Back to User Page"}
      </Button>

      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="mx-auto mt-10 flex w-full max-w-xl flex-col p-10 shadow-2xl">
          <ErrorMessage
            className="text-bold mb-5 text-red-600"
            name="name"
            component="span"
          />
          <label htmlFor="inputName">Name :</label>
          <Field
            id="inputName"
            name="name"
            placeholder={editValue ? editValue.name : "input your name..."}
            autoComplete="on"
            className="m-1 mx-auto mb-5 w-4/5 rounded-2xl border-[1px] border-blue-400 px-2 py-3 text-black"
          />

          <ErrorMessage
            className="text-bold mb-5 text-red-600"
            name="email"
            component="span"
          />
          <label htmlFor="inputEmail">Email : </label>
          <Field
            id="inputEmail"
            name="email"
            placeholder={editValue ? editValue.email : "input your email..."}
            autoComplete="on"
            className="m-1 mx-auto mb-5 w-4/5 rounded-2xl border-[1px] border-blue-400 px-2 py-3 text-black"
          />

          <ErrorMessage
            className="text-bold mb-5 text-red-600"
            name="gender"
            component="span"
          />
          <label htmlFor="inputGender">Gender : </label>
          <Field
            id="inputGender"
            name="gender"
            placeholder={editValue ? editValue.gender : "input your gender.."}
            autoComplete="on"
            className="m-1 mx-auto mb-5 w-4/5 rounded-2xl border-[1px] border-blue-400 px-2 py-3 text-black"
          />

          <ErrorMessage
            className="text-bold mb-5 text-red-600"
            name="status"
            component="span"
          />
          <label htmlFor="inputStatus">Status : </label>
          <Field
            id="inputStatus"
            name="status"
            placeholder={editValue ? editValue.status : "input your status.."}
            autoComplete="on"
            className="m-1 mx-auto mb-5 w-4/5 rounded-2xl border-[1px] border-blue-400 px-2 py-3 text-black"
          />

          <hr className="mx-auto my-5 w-4/5 bg-black" />

          <Button
            className="ring-1 ring-gray-600 px-5 text-gray-100 py-2 rounded-xl mx-auto bg-gray-700 hover:bg-gray-100 hover:text-gray-700 "
            type="submit"
          >
            {edit ? "Edit User" : "Add User"}
          </Button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddUser;
