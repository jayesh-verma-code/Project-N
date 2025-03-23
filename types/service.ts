import { SERVICES } from '../contents/chatbot-services';
import { ITEM_VARIANTS } from '../sections/ChatBotServices/chatbot-services';

export interface ServiceCardProps {
  service: (typeof SERVICES)[number];
  index: number;
  isActive: boolean;
  setActive: (index: number | null) => void;
  variants: typeof ITEM_VARIANTS;
}