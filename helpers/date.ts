import dayjs, { ManipulateType } from 'dayjs';

const someTimeLater = ({ value, unit }: { value: number; unit?: ManipulateType }) =>
  dayjs().add(value, unit).toISOString();

const differenceBetweenDates = ({
  firstDate,
  secondDate,
  unit = 'second',
}: {
  firstDate: string;
  secondDate: string;
  unit?: ManipulateType;
}) => {
  const laterDate = dayjs(secondDate);
  const soonerDate = dayjs(firstDate);
  return laterDate.diff(soonerDate, unit);
};

export { someTimeLater, differenceBetweenDates };
