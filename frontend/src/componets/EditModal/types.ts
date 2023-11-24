export type Tab = "personal" | "about" | "social";
export interface EditTabsProps {
  action: (tab: Tab) => void;
  active: Tab;
}
