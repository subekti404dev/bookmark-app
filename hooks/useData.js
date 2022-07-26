import { useEffect, useState } from "react";

export default function useData() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [indexItemToEdit, setIndexItemToEdit] = useState();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/data");
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const json = await response.json();
      setData(json?.data || []);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  const updateData = async (data) => {
    setLoading(true);
    try {
      const response = await fetch("/api/data/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ data }),
      });
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const json = await response.json();
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  const addNew = async ({ name, url }) => {
    const newData = [...data, { name, url }];
    setData(newData);
    await updateData(newData);
  };

  const editItem = async ({ name, url }) => {
    const newData = [...data];
    newData[indexItemToEdit] = { name, url };
    setData(newData);
    await updateData(newData);
  };

  const deleteItem = async (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    setData(newData);
    await updateData(newData);
  };

  const dataToUpdate = indexItemToEdit > -1 ? data[indexItemToEdit] : null;

  const onClickSubmit = dataToUpdate ? editItem : addNew;

  useEffect(() => {
    fetchData();
  }, []);


  return {
    data,
    dataToUpdate,
    onClickSubmit,
    deleteItem,
    setIndexItemToEdit,
    loading,
    error,
  };
}
