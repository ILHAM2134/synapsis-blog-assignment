import { useEffect, useState } from "react";
import Pagination from "@/components/Pagination";
import UserPage from "@/components/user/UserPage";
import AddUser from "@/components/user/AddUser";

import type { GetStaticProps } from "next";

export type UserProps = {
  email?: string;
  gender?: string;
  id?: number;
  name?: string;
  status?: string;
};

const User = ({ response }: { response: UserProps[] }) => {
  const [temp, setTemp] = useState(response);
  const [search, setSearch] = useState("");
  const [addUser, setAddUser] = useState(false);
  const [pagData, setPagData] = useState([[{}]]);
  const [pagNum, setPagNum] = useState(0);
  const [edit, setEdit] = useState(false);
  const [editValue, setEditValue] = useState(null);
  const [displayPag, setDisplayPag] = useState(true)

  useEffect(() => {
    let dummy = [];
    let numDummy = 1;
    for (let i = 0; i < temp.length; i += 20) {
      dummy.push(temp.slice(i, 20 * numDummy));
      numDummy++;
    }
    setPagData([...dummy]);
  }, [temp]);

  return (
    <div>
      {addUser ? (
        <AddUser
          setAddUser={setAddUser}
          pagData={pagData}
          setPagData={setPagData}
          edit={edit}
          setEdit={setEdit}
          editValue={editValue}
          setEditValue={setEditValue}
          temp={temp}
        />
      ) : (
        <UserPage
          setAddUser={setAddUser}
          search={search}
          setSearch={setSearch}
          pagData={pagData}
          setPagData={setPagData}
          pagNum={pagNum}
          temp={temp}
          setEdit={setEdit}
          setEditValue={setEditValue}
          setDisplayPag={setDisplayPag}
        />
      )}
      <Pagination pagData={pagData} setPagNum={setPagNum} displayPag={displayPag}/>;
    </div>
  );
};

export default User;

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch(
    "https://gorest.co.in/public/v2/users?page=1&per_page=100"
  );
  const response = await res.json();

  return {
    props: {
      response,
    },
  };
};
