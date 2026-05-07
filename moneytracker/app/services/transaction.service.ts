import api from "../lib/api";

type Params = {
  timeFrame: string;
}

export default async function getTransactions(params: Params) {
  try {
    const res = await api.get("/transactions", {
      params: {
        timeFrame: params.timeFrame,
      },
    });

    return res.data;
  } catch (error) {
    if (error instanceof Error) {
      return {
        message: "Error",
        error: error.message,
      };
    }

    return {
      message: "Unknown error",
    };
  }
}
