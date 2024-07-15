import dayjs, { ManipulateType } from "dayjs";

const someTimeLater = ({ value, unit }: { value: number, unit?: ManipulateType }) => dayjs().add(value, unit).toISOString()

export {
  someTimeLater
}
