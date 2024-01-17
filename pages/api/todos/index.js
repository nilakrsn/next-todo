import DBConnection from "@/database/connection";
const todoList = [
  {
    id: 1,
    title: "bangun pagi",
    desc: "bangun pagi",
    endTime: new Date("2024-01-09 05:00").getDate(),
  },
  {
    id: 2,
    title: "bangun pagi",
    desc: "bangun pagi",
    endTime: new Date("2024-01-09 05:00").getDate(),
  },
  {
    id: 3,
    title: "bangun pagi",
    desc: "bangun pagi",
    endTime: new Date("2024-01-09 05:00").getDate(),
  },
];

function authentication(username, password) {
  if (username === "admin" && password === "password123") {
    return true;
  }
  return false;
}

async function POSTHandler(request, response) {
  const { body } = request;
  const query = "INSERT INTO todos VALUES(null, ?, ?, ?)";
  const DB = await DBConnection();
  const [result] = await DB.execute(query, [
    body.title,
    body.description,
    body.end_time,
  ]);
  DB.end();

  return response.status(200).json({
    code: 200,
    status: "OK",
    data: result,
  });
}

async function DELETEHandler(request, response) {
  const { body } = request;
  const query = "DELETE FROM todos WHERE id = ?";
  const DB = await DBConnection();
  const [result] = await DB.execute(query, [body?.id]);
  DB.end();

  return response.status(200).json({
    code: 200,
    status: "OK",
    data: result,
  });
}
async function PUTHandler(request, response) {
  const { body } = request;
  const query =
    "UPDATE todos SET title=?, description=?, end_time=? WHERE id=?;";
  const DB = await DBConnection();
  const [result] = await DB.execute(query, [
      body.title,
      body.description,
      body.end_time,
      body.id,
  ]);
  DB.end();

  return response.status(200).json({
    code: 200,
    status: "OK",
    data: result,
  });
}
async function handler(req, res) {
  const { method, query } = req;
  const { username, password } = query;

  if (authentication(username, password)) {
    if (method === "GET") return GEThandler(req, res);
    if (method === "POST") return POSTHandler(req, res);
    if (method === "DELETE") return DELETEHandler(req, res);
    if (method === "PUT") return PUTHandler(req, res);
  }

  return res.status(400).json();
}

async function GEThandler(request, response) {
  const DB = await DBConnection();
  const [result] = await DB.execute("SELECT * FROM todos", []);
  DB.end();

  return response.status(200).json({
    code: 200,
    status: "OK",
    data: result,
  });
}

export default handler;
