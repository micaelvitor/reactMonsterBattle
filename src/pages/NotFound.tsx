import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Ghost, Home } from "lucide-react"
import { useTranslation } from "react-i18next"

export function NotFound() {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-center py-12">
      <Card className="max-w-md mx-auto text-center bg-black/20 backdrop-blur-sm border-white/20 animate-in fade-in-0 zoom-in-95 duration-500">
        <CardHeader>
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
            <Ghost className="w-12 h-12 text-yellow-400" />
          </div>
          <CardTitle className="text-3xl font-bold text-white">{t("notFound.title")}</CardTitle>
          <CardDescription className="text-gray-300 mt-2">
            {t("notFound.description")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 mb-6">
            {t("notFound.lost")}
          </p>
          <Button asChild className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            <Link to="/">
              <Home className="w-4 h-4 mr-2" />
              {t("notFound.back")}
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}