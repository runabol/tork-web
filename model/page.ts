interface Page<Type> {
  items: Type[];
  size: number;
  number: number;
  totalPages: number;
  totalItems: number;
}
