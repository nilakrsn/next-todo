import DBConnection from "@/database/connection";
async function handler(request, response) {
    const DB = await DBConnection();
    const query = "SELECT * FROM todos WHERE id=?";
    const [result] = await DB.execute(query, [
        body.id
    ]);
    DB.end();
  
    return response.status(200).json({
      code: 200,
      status: "OK",
      data: result,
    });
  }
  export default handler