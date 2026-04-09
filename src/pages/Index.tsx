import { useState } from "react";
import { CheckCircle2, Circle, ClipboardCheck, Filter } from "lucide-react";

interface CheckItem {
  id: string;
  category: string;
  title: string;
  checked: boolean;
  memo: string;
}

const initialItems: CheckItem[] = [
  { id: "1", category: "월간 점검", title: "고객정보 접근권한 확인", checked: false, memo: "" },
  { id: "2", category: "월간 점검", title: "비밀번호 변경 여부", checked: false, memo: "" },
  { id: "3", category: "월간 점검", title: "문서 보관 상태", checked: false, memo: "" },
  { id: "4", category: "분기 점검", title: "시스템 로그 점검", checked: false, memo: "" },
  { id: "5", category: "분기 점검", title: "외부감사 자료 준비", checked: false, memo: "" },
  { id: "6", category: "분기 점검", title: "규정 변경사항 반영", checked: false, memo: "" },
];

type FilterType = "전체" | "완료" | "미완료";

const Index = () => {
  const [items, setItems] = useState<CheckItem[]>(initialItems);
  const [filter, setFilter] = useState<FilterType>("전체");

  const completedCount = items.filter((i) => i.checked).length;
  const totalCount = items.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  const toggleCheck = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, checked: !item.checked } : item))
    );
  };

  const updateMemo = (id: string, memo: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, memo } : item))
    );
  };

  const filtered = items.filter((item) => {
    if (filter === "완료") return item.checked;
    if (filter === "미완료") return !item.checked;
    return true;
  });

  const categories = [...new Set(filtered.map((i) => i.category))];
  const filters: FilterType[] = ["전체", "완료", "미완료"];

  return (
    <div className="min-h-screen bg-background pb-12">
      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-border bg-card/80 backdrop-blur-md">
        <div className="container max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3 mb-4">
            <ClipboardCheck className="h-7 w-7 text-primary" />
            <h1 className="text-xl font-bold text-foreground tracking-tight">
              OK금융 업무 점검
            </h1>
          </div>

          {/* Progress */}
          <div className="mb-3">
            <div className="flex items-center justify-between text-sm mb-1.5">
              <span className="text-muted-foreground">진행률</span>
              <span className="font-semibold text-foreground">
                {completedCount}/{totalCount}
                <span className="text-muted-foreground ml-1">
                  ({Math.round(progressPercent)}%)
                </span>
              </span>
            </div>
            <div className="h-2.5 rounded-full bg-progress-bg overflow-hidden">
              <div
                className="h-full rounded-full bg-progress-fill transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Filter */}
          <div className="flex gap-2">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
                  filter === f
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-muted"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="container max-w-2xl mx-auto px-4 pt-6 space-y-6">
        {categories.map((category) => (
          <section key={category}>
            <div className="flex items-center gap-2 mb-3">
              <Filter className="h-4 w-4 text-primary" />
              <h2 className="text-sm font-semibold text-primary uppercase tracking-wider">
                {category}
              </h2>
            </div>
            <div className="space-y-3">
              {filtered
                .filter((item) => item.category === category)
                .map((item) => (
                  <div
                    key={item.id}
                    className={`rounded-lg border bg-card p-4 transition-all duration-200 ${
                      item.checked
                        ? "border-complete/30 bg-complete/5"
                        : "border-border hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <button
                        onClick={() => toggleCheck(item.id)}
                        className="mt-0.5 shrink-0 transition-transform"
                      >
                        {item.checked ? (
                          <CheckCircle2 className="h-5 w-5 text-complete animate-check-pop" />
                        ) : (
                          <Circle className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        <span
                          className={`block font-medium transition-colors ${
                            item.checked
                              ? "text-muted-foreground line-through"
                              : "text-card-foreground"
                          }`}
                        >
                          {item.title}
                        </span>
                        <input
                          type="text"
                          placeholder="메모 입력..."
                          value={item.memo}
                          onChange={(e) => updateMemo(item.id, e.target.value)}
                          className="mt-2 w-full rounded-md border border-border bg-muted/50 px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </section>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            해당하는 항목이 없습니다.
          </div>
        )}
      </main>
    </div>
  );
};

export default Index;
