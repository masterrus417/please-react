import { makeAutoObservable } from 'mobx';
import axios from 'axios';

interface HistoryEvent {
  event_type: string;
  event_type_name: string;
  event_description: string;
  event_date: string;
  event_user: string | null;
}

interface HistoryResponse {
  entity_id: number;
  history: HistoryEvent[];
}

class HistoryStore {
  history: HistoryEvent[] = [];
  loading: boolean = false;
  error: string = '';

  constructor() {
    makeAutoObservable(this),
    {};
  }

  async fetchHistory(_entityId: number) {
    try {
      this.loading = true;
      const response = await axios.get<HistoryResponse>(`http://92.53.119.132:80/api/v1/history/53`)//;${entityId}
      this.history = response.data.history;
    } catch (err) {
      this.error = 'Ошибка при получении истории изменений: ' + err;
    } finally {
      this.loading = false;
    }
  }
}

export default new HistoryStore();
