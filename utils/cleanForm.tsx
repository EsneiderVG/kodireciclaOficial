export default function cleanForm(form: HTMLFormElement) {

  const inputs = form.getElementsByTagName("input");
  for (let i = 0; i < inputs.length; i++) {
    inputs.item(i)!.value = "";
    inputs.item(i)!.checked = false;
  }
}
