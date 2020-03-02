import styled from 'styled-components';

import { colors } from 'ui';

const Outer = styled.div``;

const Section = styled.div`
  margin: 3em 0;

  h3 {
    margin: 0 0 0 0.5em;
    font-size: 1.2rem;
  }
`;

const PropertiesOuter = styled.div`
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid ${colors.light};
  background: #fff;
  margin-top: 1em;
`;

const Properties = styled.table`
  width: 100%;
  border-collapse: collapse;

  td {
    width: 50%;
    padding: 1em;
    border: 0px solid ${colors.light};
  }

  tr:not(:first-child) td {
    border-top-width: 1px;
  }
`;

export default function PropertiesTable({ sections }) {
  console.log(sections);
  return (
    <Outer>
      {sections.map((section, i) => (
        <Section key={i}>
          <h3>{section.title}</h3>
          <PropertiesOuter>
            <Properties>
              {section.properties.map((property, i) => (
                <tr key={i}>
                  <td>{property.key}</td>
                  <td>{property.value}</td>
                </tr>
              ))}
            </Properties>
          </PropertiesOuter>
        </Section>
      ))}
    </Outer>
  );
}
