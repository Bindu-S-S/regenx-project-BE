const uploadMessage = async (input) => {
  const newData = {
    text: input,
  };

  const resp = await Share.create(newData);
  return res.status(201).json({
    id: resp,
    message: "Successful",
  });
};

const updateMessage = async (input, id) => {
  const newData = {
    text: input,
  };

  console.log(Share.findById("67d5ddc86e84d0b25d60ebb5"));
  const resp = await Share.updateOne(
    { _id: "67d5ddc86e84d0b25d60ebb5" },
    newData
  );
  return res.status(201).json({
    id: resp,
    message: "Successful",
  });
};
