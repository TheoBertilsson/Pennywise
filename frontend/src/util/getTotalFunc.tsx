export async function getTotalFunc(id: number, month: number) {
  try {
    let thisMonth = month + 1;

    const response = await fetch(
      `/getTotal?id=${id}&month=${thisMonth}&day=25`
    );
    if (response.ok) {
      const result = await response.json();
      return result;
    } else {
      const text = await response.text();
      throw new Error(text || response.statusText);
    }
  } catch (error) {
    console.log("Fetch error: " + error);
    return false;
  }
}
