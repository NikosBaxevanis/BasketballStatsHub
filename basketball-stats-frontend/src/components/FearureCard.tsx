export type FeatureCardPropsType = {
  icon: string;
  text: string;
  value: string;
};

const FeatureCard = ({ icon, text, value }: FeatureCardPropsType) => {
  return (
    <div className="feature-card">
      <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center mx-auto mb-4 text-[20px] text-white">
        {icon}
      </div>
      <h3 className="text-sm mb-2 text-slate-500 font-medium">{text}</h3>
      <p className="px-8">{value}</p>
    </div>
  );
};

export default FeatureCard;
