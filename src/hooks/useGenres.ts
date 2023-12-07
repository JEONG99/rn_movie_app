import { useQueries } from "@tanstack/react-query";
import { IGetGenresResult, getGenres } from "../utils/api";

const types = ["movie", "tv"];

const useGenres = () => {
  const results = useQueries({
    queries: types.map((_type) => ({
      queryKey: ["genre", _type],
      queryFn: () => getGenres({ type: _type }),
      staleTime: Infinity,
      select: (data: IGetGenresResult) => data.genres,
    })),
  });

  return results
    .map((result) => result.data || [])
    .flat()
    .filter((result, index, _results) => _results.indexOf(result) === index);
};

export default useGenres;
