export function useQuery(search: string) {
    return new URLSearchParams(search);
}