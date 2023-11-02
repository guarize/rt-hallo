import classNames from 'classnames';
import React from 'react';

type Colors = 'red' | 'green' | 'blue' | 'yellow';

const colorsMapper: {
  [key in Colors]: string;
} = {
  blue: 'bg-blue-500',
  red: 'bg-red-500',
  green: 'bg-green-500',
  yellow: 'bg-yellow-400',
};

function ColorCircle({
  color,
  index,
  clickable,
  children,
  removable,
  handleDeleteColor,
  ...props
}: {
  color: Colors;
  index?: number;
  clickable?: boolean;
  removable?: boolean;
  handleDeleteColor?: (index: number) => void;
} & any &
  React.HTMLAttributes<HTMLDivElement>) {
  const className = classNames(
    'flex items-center justify-center w-24 h-24 rounded-full relative',
    colorsMapper[color],
    {
      'cursor-default': !clickable,
      'cursor-pointer hover:scale-[1.05] transition-all ease-in-out duration-200 group':
        clickable || removable,
    },
  );

  function handleOnClick() {
    props?.onClick?.();

    handleDeleteColor?.(index);
  }

  return (
    <div {...props} className={className} onClick={handleOnClick}>
      {!removable && children}
      {removable && (
        <>
          <p className="absolute opacity-0 group-hover:opacity-100 font-mono text-[18px] font-semibold text-black">
            Remover
          </p>
          <p className="absolute opacity-100 group-hover:opacity-0">
            {children}
          </p>
        </>
      )}
    </div>
  );
}

function Colors() {
  const [colorsResults, setColorsResult] = React.useState<
    { color: Colors; index: number }[]
  >([]);

  function handleSetColorsResults(color: Colors, index) {
    setColorsResult((prev) => [...prev, { color, index }]);
  }

  function handleDeleteColor(index: number) {
    setColorsResult((prev) =>
      prev
        .filter((color) => color.index !== index)
        .map(({ color }, index) => ({ color, index })),
    );
  }

  const availableColors: Colors[] = ['red', 'green', 'blue', 'yellow'];

  return (
    <div className="w-screen h-screen bg-gray-[#242424]">
      <div className="w-full h-full flex flex-col pt-44 items-center">
        <h1 className="font-sans text-3xl font-bold">
          <p>Memória Cromática</p>
        </h1>

        <div className="mt-10 flex flex-col items-start justify-start gap-4">
          <div className="flex items-center justify-center gap-5">
            {availableColors?.map((color) => (
              <ColorCircle
                color={color}
                clickable
                onClick={() =>
                  handleSetColorsResults(color, colorsResults.length)
                }
              />
            ))}
          </div>
        </div>

        <div className="mt-20 flex flex-col items-center justify-center">
          <h1 className="font-sans text-2xl font-bold text-left">Resultado:</h1>

          {Boolean(colorsResults.length) && (
            <button
              className="bg-gray-700 rounded px-4 py-2 mt-4 font-sans text-[20px] hover:bg-gray-600 transition-colors ease-in-out duration-200"
              onClick={() => setColorsResult([])}
            >
              Resetar
            </button>
          )}

          <div className="mt-10 w-full flex flex-col items-start justify-start gap-4">
            <div className="flex items-center justify-center gap-5 max-w-[1024px] flex-wrap">
              {colorsResults.map(({ color, index }) => (
                <ColorCircle
                  color={color}
                  index={index}
                  removable
                  handleDeleteColor={handleDeleteColor}
                >
                  <p className="font-mono text-[28px] font-semibold text-black">
                    {index + 1}
                  </p>
                </ColorCircle>
              ))}
            </div>

            {!colorsResults.length && (
              <div className="px-6 py-4 flex items-center justify-center bg-gray-700 rounded">
                <p className="font-sans text-[18px] font-bold">
                  Nenhuma cor adicionada
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Colors;
