const getCities = async (req, res) => {
  try {
    // const response = await fetch(
    //   "https://countriesnow.space/api/v0.1/countries/state/cities",
    //   {
    //     method: "POST",
    //     body: JSON.stringify({
    //       country: "India",
    //       state: "TamilNadu",
    //     }),
    //   }
    // );

    const response = await fetch(
      "https://countriesnow.space/api/v0.1/countries"
    );

    console.log(response);

    const data = response.json();
    return res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getCities };
