const readFile = (file) => {
  const reader = new FileReader();
  reader.onload = () => {
    const data = reader.result;
    // do something with data
  };
  reader.readAsText(file);
};

export default readFile;
