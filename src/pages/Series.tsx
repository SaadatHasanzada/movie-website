import { filterSearchResults, filterSeries } from "../utils/dataFilters";
import { useEffect, useState } from "react";

import { Media } from "@/interfaces/Media";
import MediaList from "../components/MediaList";
import MediaSlider from "@/components/MediaSlider";
import React from "react";
import TrendingCard from "@/components/TrendingCard";
import { addMediaType } from "@/lib/utils";
import { getAllTvShows } from "@/api/tmdb";
import { useAsyncService } from "@/hooks/useAsyncService";
import { useSearchContext } from "../contexts/SearchContext";

const Series: React.FC = () => {
  const { searchQuery } = useSearchContext();

  const { data: tvSeries, loading: isTvSeriesLoading } =
    useAsyncService(getAllTvShows);
  const [tvSeriesData, setTvSeriesData] = useState<
    {
      data: Media[];
      title: string;
    }[]
  >([]);

  console.log(tvSeries);

  useEffect(() => {
    if (tvSeries) {
      setTvSeriesData([
        { data: tvSeries[3].data?.results, title: "Airing Today" },
        { data: tvSeries[0].data?.results, title: "Popular Tv Series" },
        { data: tvSeries[1].data?.results, title: "Top Rated Tv Series" },
        { data: tvSeries[2].data?.results, title: "On The Air" }
      ]);
    }
  }, [tvSeries]);

  // const filterFunction = searchQuery
  //   ? (movies: Movie[]) =>
  //       filterSearchResults(filterSeries(movies), searchQuery)
  //   : filterSeries;
  return tvSeriesData.map((seriesList) => (
    <MediaSlider key={seriesList.title} title={seriesList.title}>
      {addMediaType(seriesList.data, "tv")?.map((media) => (
        <TrendingCard
          key={media.id}
          TrendingMedia={media}
          isTrendingMediaLoading={isTvSeriesLoading}
        />
      )) || []}
    </MediaSlider>
  ));
};

export default Series;
