import { AA_CONTRAST, AAA_CONTRAST, UI_CONTRAST } from 'src/constants';

import { ResultCell } from './components/ResultCell';
import styles from './ResultsTable.module.scss';

export const ResultsTable = ({ contrast }: { contrast: number }) => {
  const isContrast3to1 = <ResultCell didPass={contrast >= UI_CONTRAST} />;
  const isContrast4to5to1 = <ResultCell didPass={contrast >= AA_CONTRAST} />;
  const isContrast7to1 = <ResultCell didPass={contrast >= AAA_CONTRAST} />;

  return (
    <table
      className={styles.root}
      data-testid='results-table'
      data-contrast={contrast}
    >
      <caption>WCAG Compliance Table</caption>
      <thead>
        <tr>
          <th scope='col'>Element</th>
          <th scope='col'>
            <span className='sr'>Meets WCAG </span>AA
          </th>
          <th scope='col'>
            <span className='sr'>Meets WCAG </span>AAA
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope='row'>Small Text</th>
          <td>{isContrast4to5to1}</td>
          <td>{isContrast7to1}</td>
        </tr>
        <tr>
          <th scope='row'>Large Text</th>
          <td>{isContrast3to1}</td>
          <td>{isContrast4to5to1}</td>
        </tr>
        <tr>
          <th scope='row'>UI Components</th>
          <td>{isContrast3to1}</td>
          <td>{isContrast3to1}</td>
        </tr>
      </tbody>
    </table>
  );
};
