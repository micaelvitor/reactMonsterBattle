import { useState, useMemo, useEffect } from "react"
import { useMonsterStore } from "@/store/useMonsterStore"
import { MonsterCard } from "@/components/MonsterCard"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Plus, Search, ArrowUp, ArrowDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Monster } from "@/models/Monster"
import { useTranslation } from "react-i18next"

type SortKey = keyof Omit<Monster, "id" | "imageUrl">
type SortConfig = {
  key: SortKey
  order: "asc" | "desc"
}

export function MonsterList() {
  const { monsters } = useMonsterStore()
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState("")
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "name", order: "asc" })
  const MONSTERS_PER_PAGE = 8
  const { t } = useTranslation()

  const filteredAndSortedMonsters = useMemo(() => {
    const { key, order } = sortConfig

    return monsters
      .filter((monster) => monster.name.toLowerCase().includes(searchTerm.toLowerCase()))
      .sort((a, b) => {
        const aValue = a[key]
        const bValue = b[key]

        let comparison = 0
        if (typeof aValue === "string" && typeof bValue === "string") {
          comparison = aValue.localeCompare(bValue, "pt-BR", { sensitivity: "base" })
        } else if (typeof aValue === "number" && typeof bValue === "number") {
          comparison = aValue - bValue
        }

        return order === "asc" ? comparison : -comparison
      })
  }, [monsters, searchTerm, sortConfig])

  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, sortConfig])

  useEffect(() => {
    const totalPages = Math.ceil(monsters.length / MONSTERS_PER_PAGE)
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages)
    } else if (totalPages === 0) {
      setCurrentPage(1)
    }
  }, [monsters.length, currentPage])

  const totalPages = Math.ceil(filteredAndSortedMonsters.length / MONSTERS_PER_PAGE)
  const paginatedMonsters = filteredAndSortedMonsters.slice(
    (currentPage - 1) * MONSTERS_PER_PAGE,
    currentPage * MONSTERS_PER_PAGE
  )

  const handlePreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
  }

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
  }

  if (monsters.length === 0) {
    return (
      <Card className="max-w-2xl mx-auto bg-black/20 backdrop-blur-sm border-white/20 animate-in fade-in-0 slide-in-from-bottom-5 duration-500">
        <CardHeader
          className="text-center animate-in fade-in-0 slide-in-from-bottom-5 duration-500"
          style={{ animationDelay: "100ms", animationFillMode: "backwards" }}
        >
          <CardTitle className="text-2xl text-white flex items-center justify-center gap-2">
            <Users className="w-6 h-6" />
            {t("monsterList.noneCreated")}
          </CardTitle>
          <CardDescription className="text-gray-300">
            {t("monsterList.createFirstDesc")}
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center">
          <Link
            to="/create"
            className="group inline-block animate-in fade-in-0 slide-in-from-bottom-5 duration-500"
            style={{ animationDelay: "200ms", animationFillMode: "backwards" }}
            aria-label={t("monsterList.createNew")}
          >
            <div className="w-32 h-32 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center transition-all duration-300 group-hover:bg-white/20 group-hover:scale-110 cursor-pointer">
              <Plus className="w-16 h-16 text-gray-400 transition-colors group-hover:text-white" />
            </div>
          </Link>
          <p
            className="text-gray-400 mb-4 animate-in fade-in-0 slide-in-from-bottom-5 duration-500"
            style={{ animationDelay: "300ms", animationFillMode: "backwards" }}
          >
            {t("monsterList.clickToCreate")}
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-4xl md:text-5xl font-bold text-white flex items-center justify-center gap-4">
          <Users className="w-10 h-10 text-blue-400" />
          {t("monsterList.title")}
          <Users className="w-10 h-10 text-blue-400" />
        </h1>
        <p className="text-lg text-gray-300">
          {t("monsterList.subtitle")}
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            type="text"
            placeholder={t("monsterList.searchPlaceholder")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-400"
          />
        </div>
        <div className="flex w-full md:w-auto items-center gap-2">
          <Select
            value={sortConfig.key}
            onValueChange={(value: SortKey) => setSortConfig({ ...sortConfig, key: value })}
          >
            <SelectTrigger className="w-full md:w-[180px] bg-white/10 border-white/20 text-white">
              <SelectValue placeholder={t("monsterList.sortBy")} />
            </SelectTrigger>
            <SelectContent className="bg-gray-800 border-white/20 text-white">
              <SelectItem value="name">{t("monsterList.sort.name")}</SelectItem>
              <SelectItem value="attack">{t("monsterList.sort.attack")}</SelectItem>
              <SelectItem value="defense">{t("monsterList.sort.defense")}</SelectItem>
              <SelectItem value="speed">{t("monsterList.sort.speed")}</SelectItem>
              <SelectItem value="hp">{t("monsterList.sort.hp")}</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setSortConfig({
                ...sortConfig,
                order: sortConfig.order === "asc" ? "desc" : "asc",
              })
            }
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            {sortConfig.order === "asc" ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {filteredAndSortedMonsters.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedMonsters.map((monster, index) => (
            <div
              key={monster.id}
              className="animate-in fade-in-0 slide-in-from-bottom-5 duration-500"
              style={{ animationDelay: `${index * 100}ms`, animationFillMode: "backwards" }}
            >
              <MonsterCard monster={monster} showActions />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-300 py-8">
          <p>{t("monsterList.notFound", { searchTerm })}</p>
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-4 pt-4">
          <Button
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            {t("monsterList.prev")}
          </Button>
          <span className="text-white font-medium">
            {t("monsterList.page", { currentPage, totalPages })}
          </span>
          <Button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            variant="outline"
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            {t("monsterList.next")}
          </Button>
        </div>
      )}
    </div>
  )
}