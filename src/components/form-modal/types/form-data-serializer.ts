import { FormData } from "@components/form-modal/types";

type FormDataSerializer<T> = (data: FormData<T>) => T;
export default FormDataSerializer;
