import type { ScenarioOption } from '../types/domain';

export type ScenarioSelectorProps = {
  scenarios: ScenarioOption[];
  selectedId: string;
  onChange: (scenarioId: string) => void;
};

const ScenarioSelector = ({ scenarios, selectedId, onChange }: ScenarioSelectorProps) => {
  return (
    <div className="scenario-selector">
      <label htmlFor="scenario-select">シナリオ</label>
      <select
        id="scenario-select"
        value={selectedId}
        onChange={(event: Event) => {
          const target = event.target as HTMLSelectElement;
          onChange(target.value);
        }}
      >
        {scenarios.map((scenario) => (
          <option key={scenario.id} value={scenario.id}>
            {scenario.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ScenarioSelector;
