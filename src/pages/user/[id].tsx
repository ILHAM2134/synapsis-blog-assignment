const DetailUser = ({ detail }: { detail: any }) => {
  return (
    <div className="text-center my-24">
      <h3 className="font-bold">{detail.name}</h3>
      <p className="my-2">email : {detail.email}</p>
      <p className="my-2">gender: {detail.gender}</p>
      <p className="my-2">status : {detail.status}</p>
    </div>
  );
};

export default DetailUser;

export const getServerSideProps = async (context: any) => {
  const id = context.query.id;
  const det = await fetch(`https://gorest.co.in/public/v2/users/${id}`);
  const detail = await det.json();

  return {
    props: {
      detail,
    },
  };
};
