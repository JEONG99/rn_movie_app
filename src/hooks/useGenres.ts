import { useQueries } from "@tanstack/react-query";
import { IGetGenresResult, getGenres } from "../utils/api";

const types = ["movie", "tv"];

interface IUseGenresProps {
  type: string;
}

const useGenres = ({ type }: IUseGenresProps): IGetGenresResult => {
  const results = useQueries({
    queries: types.map((_type) => ({
      queryKey: ["genre", _type],
      queryFn: () => getGenres({ type: _type }),
      staleTime: Infinity,
    })),
  });
  return (
    results[types.findIndex((_type) => _type === type)].data || { genres: [] }
  );
};

export default useGenres;
