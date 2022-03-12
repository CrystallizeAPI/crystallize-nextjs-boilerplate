import styled from 'styled-components';

import { H3 } from 'ui';

const Section = styled.div`
  margin: 3em 0;

  h3 {
    margin: 0 0 0.5em 0;
    font-size: var(--font-size-l);
  }
`;

const PropertiesOuter = styled.div`
  overflow: hidden;
  border-bottom: 1px solid #dfdfdf;
`;

const Properties = styled.table`
  width: 100%;
  border-collapse: collapse;

  td {
    width: 50%;
    padding: 1em 0;
    border: 0px solid #dfdfdf;
    &.key {
      width: 30%;
      font-weight: 600;
    }

    &.value {
      width: 70%;
    }
  }

  tr:not(:first-child) td {
    border-top-width: 1px;
  }
`;

export default function PropertiesTable({ sections }) {
  return (
    <div>
      {sections?.map((section, i) => (
        <Section key={i}>
          <H3>{section.title}</H3>
          <PropertiesOuter>
            <Properties>
              <tbody>
                {section.properties.map((property, i) => (
                  <tr key={i}>
                    <td className="key">{property.key}</td>
                    <td className="value">{property.value}</td>
                  </tr>
                ))}
              </tbody>
            </Properties>
          </PropertiesOuter>
        </Section>
      ))}
    </div>
  );
}
