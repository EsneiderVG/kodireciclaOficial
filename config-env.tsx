const getEnvironmentVariable = (environmentVariable: string): string => {

  if (!environmentVariable) {
    throw new Error(
      `Couldn't find environment variable: ${environmentVariable}`
    );
  } else {
    return environmentVariable;
  }
};

export const config = {
  API_URL: getEnvironmentVariable(process.env["NEXT_PUBLIC_API_URL"])
};
