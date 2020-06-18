import React, { useState, useEffect } from 'react';
import Pusher from 'pusher-js';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import TimeAgo from 'timeago-react';

import Layout from 'components/layout';
import { H1, H3, Outer } from 'ui';

const List = styled.ul`
  display: block;
  margin: 0;
  padding: 0;
  list-style: none;

  > li {
    margin: 75px 0;
    padding: 0;

    ${H3} {
      margin-left: 2rem;

      small {
        display: inline-block;
        font-size: 0.6em;
        margin-left: 15px;

        &:before {
          content: '(';
        }
        &:after {
          content: ')';
        }
      }
    }

    pre {
      padding: 2rem;
      background: var(--color-box-background);
      font-size: 0.8em;
    }
  }
`;

const Header = styled.div`
  padding: 0 2rem;
`;

export default function Logger() {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const pusher = new Pusher(process.env.PUSHER_APP_KEY, {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('my-channel');
    channel.bind('webhook-received', (data) => {
      setEntries((entries) => [{ date: new Date(), data }, ...entries]);
    });

    return () => channel.unsubscribe('my-channel');
  });

  return (
    <Layout>
      <Outer
        css={`
          max-width: 800px;
          padding: 50px 0;
        `}
      >
        <Header>
          <H1>Webhook logs</H1>

          {entries.length === 0 ? (
            'No log entries just yet'
          ) : (
            <div>
              {entries.length} {entries.length === 1 ? 'entry' : 'entries'}{' '}
              logged:
            </div>
          )}
        </Header>
        {entries.length > 0 && (
          <List>
            <AnimatePresence initial={false}>
              {entries.map((entry) => (
                <motion.li
                  key={entry.date}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                >
                  <H3>
                    <TimeAgo datetime={entry.date} />
                    <small>{entry.date.toLocaleString()}</small>
                  </H3>
                  <pre>{JSON.stringify(entry.data, null, 3)}</pre>
                </motion.li>
              ))}
            </AnimatePresence>
          </List>
        )}
      </Outer>
    </Layout>
  );
}
