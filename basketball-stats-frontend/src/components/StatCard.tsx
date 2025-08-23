export type StatCardPropsType = {
  text: string;
  value: string;
};

const StatCard = ({ text, value }: StatCardPropsType) => {
  return (
    <div className="bg-slate-100 text-slate-700 p-5 rounded-lg text-center border border-slate-200 transition-transform duration-200 ease-in-out hover:-translate-y-0.5 hover:shadow-md">
      <h3 className="text-sm mb-2 text-slate-500 font-medium">{text}</h3>
      <div className="text-2xl font-bold text-slate-800">{value}</div>
    </div>
  );
};

export default StatCard;
