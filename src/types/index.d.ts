/** Objects */
type UserProps = {
  displayName: string;
  email: string;
  password: string;
};
type ThemeProps = 'light' | 'dark';
type PorfilioAsset = {
  id: string;
  userId: string;
  symbol: string;
  price: number;
  quantity: number;
  state: 'open' | 'close';
};
type OpenTradeProps = {
  userId: string;
  symbol: string;
  openPrice: number;
  quantity: number;
};
type CloseTradeProps = {
  id: string;
  closePrice: number;
};
/**
 * @param id - id of the asset
 * @param e - Event Type
 * @param E - Event time
 * @param s - Symbol
 * @param p - Price change
 * @param P - Price change percent
 * @param w - Weighted average price
 * @param x - Previous day's close
 * @param c - Last price
 * @param Q - Last quantity
 * @param b - Best bid price
 * @param B - Best bid quantity
 * @param a - Best ask price
 * @param A - Best ask quantity
 * @param o - Open price
 * @param h - High price
 * @param l - Low price
 * @param v - Total traded base asset volume
 * @param q - Total traded quote asset volume
 * @param O - Statistics open time
 * @param C - Statistics close time
 * @param F - First trade ID
 * @param L - Last trade Id
 * @param n - Total number of trades
 */
type TickerProps = {
  id: number;
  e: string;
  E: number;
  s: string;
  p: string;
  P: string;
  w: string;
  x: string;
  c: string;
  Q: string;
  b: string;
  B: string;
  a: string;
  A: string;
  o: string;
  h: string;
  l: string;
  v: string;
  q: string;
  O: number;
  C: number;
  F: number;
  L: number;
  n: number;
};

/** Components */
type CustomButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children?: React.ReactNode;
  icon?: string;
  isLoading?: boolean;
};
type DropDownProps = {
  title?: string;
  iconBefore?: React.ReactNode;
  iconAfter?: React.ReactNode;
  isInNavbar?: boolean;
  children?: React.ReactNode;
};
type ErrorProps = {
  img?: string;
  title?: string;
  action: () => void;
};
type FormFieldsProps = {
  label: string;
  errors: FieldError | undefined;
  textBefore?: string;
  textAfter?: string;
};
type InputProps = React.InputHTMLAttributes<HTMLInputElement> & FormFieldsProps;
type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> &
  FormFieldsProps;
type MarketTickerProps = {
  tradeAsset?: any;
  liquidateAsset?: any;
  data: TickerProps;
  porfolioTrades?: {
    id: number;
  }[];
};
type ModalProps = {
  title?: string;
  isOpen: boolean;
  currentView?: string;
  onClose: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
};
type ModalChildrenProps = {
  onChangeView?: (view: string) => void;
};
/**
 * Images declaration
 */
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
