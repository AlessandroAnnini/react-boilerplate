import { useEffect, useState } from 'react';
import API, { graphqlOperation } from '@aws-amplify/api';

export default (
  nodeName,
  listNodesQuery,
  listNodesQueryInput,
  onCreateSubscription,
  onUpdateSubscription,
  onDeleteSubscription,
  getNodeQuery
) => {
  const [data, setData] = useState([]);

  const Name =
    nodeName.charAt(0).toUpperCase() + nodeName.slice(1).toLowerCase();
  const queryName = `list${Name}s`;
  const onCreateSubscriptionName = `onCreate${Name}`;
  const onUpdateSubscriptionName = `onUpdate${Name}`;
  const onDeleteSubscriptionName = `onDelete${Name}`;
  const getQueryName = `get${Name}`;

  // GET DATA FIRST TIME
  useEffect(() => {
    if (listNodesQuery && listNodesQueryInput) {
      const runBaseQuery = async () => {
        const result = await API.graphql(
          graphqlOperation(listNodesQuery, listNodesQueryInput)
        );
        // console.log(queryName);
        const baseData = result.data[queryName].items;
        setData(baseData);
      };

      runBaseQuery();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ON CREATE SUBSCRIPTION
  useEffect(() => {
    if (onCreateSubscription) {
      const runSubscription = () =>
        API.graphql(graphqlOperation(onCreateSubscription)).subscribe({
          next: async eventData => {
            // console.log(onCreateSubscriptionName);
            const baseData = eventData.value.data[onCreateSubscriptionName];
            const result = await API.graphql(
              graphqlOperation(getNodeQuery, { id: baseData.id })
            );
            const obj = result.data[getQueryName];
            setData([...data, obj]);
          }
        });

      const listener = runSubscription();

      return () => listener.unsubscribe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // ON UPDATE SUBSCRIPTION
  useEffect(() => {
    if (onUpdateSubscription) {
      const runSubscription = () =>
        API.graphql(graphqlOperation(onUpdateSubscription)).subscribe({
          next: async eventData => {
            // console.log(onUpdateSubscriptionName);
            const baseData = eventData.value.data[onUpdateSubscriptionName];
            const result = await API.graphql(
              graphqlOperation(getNodeQuery, { id: baseData.id })
            );
            const obj = result.data[getQueryName];
            const oldData = data.filter(e => e.id !== obj.id);
            setData([...oldData, obj]);
          }
        });

      const listener = runSubscription();

      return () => listener.unsubscribe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  // ON DELETE SUBSCRIPTION
  useEffect(() => {
    if (onDeleteSubscription) {
      const runSubscription = () =>
        API.graphql(graphqlOperation(onDeleteSubscription)).subscribe({
          next: async eventData => {
            // console.log(onDeleteSubscriptionName);
            const baseData = eventData.value.data[onDeleteSubscriptionName];
            const nextData = data.filter(e => e.id !== baseData.id);
            setData(nextData);
          }
        });

      const listener = runSubscription();

      return () => listener.unsubscribe();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return data;
};
