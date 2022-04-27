export default function ColorBall({ color }) {
  return <div className={["w-4 h-4 rounded-md", color].join(" ")}></div>;
}

export function addColorBallToOptions(options) {
  return options.map(function (option) {
    return {
      ...option,
      label: (
        <div className="flex flex-row items-center justify-start gap-2">
          <ColorBall color={option.ballBG} />
          <span>{option.label}</span>
        </div>
      ),
    };
  });
}
