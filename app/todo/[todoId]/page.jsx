function Page({ params }) {
  return (
    <>
      <main className="bg-white h-full">
        <h1 className="p-3">INI DETAIL TO DO ID {''}
        <b>{params?.todoId}</b>
        </h1>
      </main>
    </>
  );
}

export default Page;
