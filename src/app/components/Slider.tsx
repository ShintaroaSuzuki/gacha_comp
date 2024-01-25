"use client";

import * as RadixSlider from "@radix-ui/react-slider";

export const Slider: React.FC = () => {
  return (
    <form>
      <RadixSlider.Root
        className="relative flex items-center select-none touch-none w-[200px] h-5"
        defaultValue={[50]}
        max={100}
        step={1}
      >
        <RadixSlider.Track className="bg-blackA7 relative grow rounded-full h-[3px]">
          <RadixSlider.Range className="absolute bg-white rounded-full h-full" />
        </RadixSlider.Track>
        <RadixSlider.Thumb
          className="block w-5 h-5 bg-white shadow-[0_2px_10px] shadow-blackA4 rounded-[10px] hover:bg-violet3 focus:outline-none focus:shadow-[0_0_0_5px] focus:shadow-blackA5"
          aria-label="Volume"
        />
      </RadixSlider.Root>
    </form>
  );
};
