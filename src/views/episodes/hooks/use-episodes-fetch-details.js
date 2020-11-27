import { useEffect, useMemo, useState } from 'react';
import { useQuery, useReactiveVar } from '@apollo/client';

import { GRAPHQL_FETCH_POLICY } from '../../../common/constants/graphql';

import {
  GET_EPISODES,
  GET_EPISODE_BY_ID,
} from '../../../apollo/queries/episodes';

import { selectedListItemVar } from '../../../apollo/cache';

import EpisodesModel from '../model/EpisodesModel';

const { CACHE_AND_NETWORK, CACHE_ONLY } = GRAPHQL_FETCH_POLICY;

const useEpisodesFetchDetails = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isDrawerOpen, toggleDrawer] = useState(false);

  const selectedItemId = useReactiveVar(selectedListItemVar);

  const { data, loading, fetchMore, error } = useQuery(GET_EPISODES, {
    fetchPolicy: CACHE_AND_NETWORK,
    notifyOnNetworkStatusChange: true,
    variables: {
      page: currentPage,
    },
  });

  const { data: { episode } = {} } = useQuery(GET_EPISODE_BY_ID, {
    fetchPolicy: !isDrawerOpen ? CACHE_ONLY : CACHE_AND_NETWORK,
    variables: {
      id: selectedItemId,
    },
  });

  useEffect(() => {
    fetchMore(GET_EPISODES, {
      variables: {
        page: currentPage,
      },
    });
  }, [fetchMore, currentPage]);

  const { pageInfo, episodes } = useMemo(() => EpisodesModel(data), [data]);

  return {
    episode,
    episodes,
    isDrawerOpen,
    error,
    loading,
    pageInfo,
    setCurrentPage,
    toggleDrawer,
  };
};

export default useEpisodesFetchDetails;
