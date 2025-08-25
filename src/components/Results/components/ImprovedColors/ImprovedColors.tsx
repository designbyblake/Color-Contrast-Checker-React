import { ImprovedColorsResults } from 'src/components/Results/components/ImprovedColors/components/ImprovedColorsResults';
import { useImprovedColors } from 'src/components/Results/hooks';
import { AA_CONTRAST, AAA_CONTRAST, UI_CONTRAST } from 'src/constants';
import {
  type CombinationsContrastType,
  type TilesAndTableType
} from 'src/types/Colors';

export const ImprovedColors = ({
  hex1,
  hex2,
  rgb1,
  rgb2,
  setColorsAndFlag
}: CombinationsContrastType) => {
  const { getNewColors } = useImprovedColors();
  const updatedUIColors: TilesAndTableType[] = getNewColors(
    rgb1,
    rgb2,
    UI_CONTRAST
  );

  const updatedAAColors: TilesAndTableType[] = getNewColors(
    rgb1,
    rgb2,
    AA_CONTRAST
  );
  const updatedAAAColors: TilesAndTableType[] = getNewColors(
    rgb1,
    rgb2,
    AAA_CONTRAST
  );

  if (
    updatedUIColors.length === 0 &&
    updatedAAColors.length === 0 &&
    updatedAAAColors.length === 0
  ) {
    return null;
  }
  return (
    <>
      <h2>
        Suggested Colors to meet WCAG Contrast for #{hex1} - #{hex2}
      </h2>
      <div className='root'>
        {updatedUIColors.length > 0 && (
          <ImprovedColorsResults
            title='UI Updates'
            colors={updatedUIColors}
            setColorsAndFlag={setColorsAndFlag}
          />
        )}

        {updatedAAColors.length > 0 && (
          <ImprovedColorsResults
            title='AA Updates'
            colors={updatedAAColors}
            setColorsAndFlag={setColorsAndFlag}
          />
        )}

        {updatedAAAColors.length > 0 && (
          <ImprovedColorsResults
            title='AAA Updates'
            colors={updatedAAAColors}
            setColorsAndFlag={setColorsAndFlag}
          />
        )}
      </div>
    </>
  );
};
