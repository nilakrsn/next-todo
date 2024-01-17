function handler(request, response) {

  return response.json({
    code: 200,
    status: "OK",
    data: {authorBy: "ConnexSoft", desc: "lorem ipsum dolor sit"},
  });
}

export default handler;