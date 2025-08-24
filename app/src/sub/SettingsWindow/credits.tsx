import { Dialog } from "@/components/ui/dialog";
import { open } from "@tauri-apps/plugin-shell";
import { ExternalLink, Heart, User } from "lucide-react";
import "./assets/font.css";

interface DonationData {
  user: string;
  note?: string;
  amount: number;
  currency?: string;
}

const donations: DonationData[] = [
  { user: "ShawnSnow", note: "感谢PG", amount: 40 },
  { user: "飞度", note: "做的很酷，真的谢谢你们", amount: 50 },
  { user: "鳕鱼", note: "支持开源支持国产，加油", amount: 70 },
  { user: "木头", amount: 100 },
  { user: "林檎LOKI", amount: 5 },
  { user: "Edelweiß", amount: 5 },
  { user: "Z·z.", note: "求个ipad版本的", amount: 5 },
  { user: "", note: "太酷了哥们", amount: 5 },
  { user: "蓝海", amount: 10 },
  { user: "渡己", amount: 5 },
  { user: "微角秒", note: "希望这个项目越做越好", amount: 50 },
  { user: "安麒文", note: "感谢您的软件，加油", amount: 5 },
  { user: "", note: "SVG", amount: 16 },
  { user: "💥知识学爆💥", note: "你们的软件很好用，给你们点赞", amount: 20 },
  { user: "点正🌛🌛🌛", note: "膜拜一下", amount: 10 },
  { user: "米虫先生", amount: 100 },
  { user: "星尘_", note: "加油，看好你们", amount: 5 },
  { user: "可乐mono", note: "加油，目前用过最好的导图类软件", amount: 5 },
  { user: "62.3%", note: "Up要加油呀，我换新电脑第一个装的就是你的软件", amount: 5 },
  { user: "All the luck", note: "感谢你的存在让世界更美好，我希望也在努力的做到", amount: 30 },
  { user: "胡俊海", amount: 5 },
  { user: "人", amount: 20 },
  { user: "木棉", note: "谢谢up主的软件", amount: 20 },
  { user: "Distance", note: "加油！！！还没用，先捐赠", amount: 5 },
  { user: "xxx", amount: 5 },
  { user: "", amount: 5 },
  { user: "", amount: 10 },
  { user: "chocolate", amount: 20 },
  { user: "Think", amount: 100 },
  { user: "Sullivan", note: "为知识付费", amount: 5 },
  { user: "天涯", note: "为知识付费", amount: 2.33 },
  { user: "", note: "66666666", amount: 6.66 },
  { user: "阿龙", note: "好，请继续努力！", amount: 20 },
  { user: "把验航", amount: 5 },
  { user: "全沾工程师", note: "太棒啦，能力有限，先小小支持一波", amount: 20 },
  { user: "耀轩之", note: "祝你越来越好", amount: 5 },
  { user: "otto pan", note: "求mac缩放优化", amount: 50 },
  { user: "llll", note: "支持", amount: 5 },
  { user: "透明", amount: 8.88 },
  { user: "七侠镇的小智", amount: 20 },
  { user: "", amount: 20 },
  { user: "ifelse", note: "keep dev", amount: 20 },
  { user: "Ray", note: "继续加油[加油]", amount: 18 },
  { user: "耀辰", note: "思维导图太牛了", amount: 5 },
  { user: "云深不知处", note: "帅", amount: 5 },
  { user: "好的名字", note: "pg太好用了，只能说", amount: 5 },
  { user: "", note: "好用", amount: 10 },
  { user: "解京", note: "感谢软件，祝早日多平台通用", amount: 50 },
  { user: "唐扬睡醒了", note: "我会互相嵌套了(开心)", amount: 0.01 },
  { user: "唐扬睡醒了", note: "很好用，请问如何交叉嵌套", amount: 6.66 },
  { user: "Kelton", note: "很棒的软件，感谢开发者！", amount: 5 },
  { user: "", amount: 50 },
  { user: "斑驳窖藏", amount: 5 },
  { user: "灰烬", amount: 20 },
  { user: "赵长江", amount: 50 },
  { user: "cityoasis", note: "感谢你的付出。这是一个很好的软件。希望能尽快做到美观成熟", amount: 5 },
  { user: "A许诺溪", note: "希望能和obsidian完美协同", amount: 20 },
  { user: "L.L.", note: "加油小小心思，不成敬意", amount: 20 },
];

/**
 * 鸣谢界面
 * @returns
 */
export default function CreditsTab() {
  const totalAmount = donations.reduce((sum, donation) => sum + donation.amount, 0);

  // 计算从2024年9月1日到现在的月数
  const startDate = new Date(2024, 8, 1);
  const currentDate = new Date();
  const monthsDiff =
    (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
    (currentDate.getMonth() - startDate.getMonth()) +
    (currentDate.getDate() >= startDate.getDate() ? 0 : -1);
  const actualMonths = Math.max(monthsDiff + 1, 1); // 至少为1个月
  const averageMonthlyAmount = totalAmount / actualMonths;

  return (
    <div className="mx-auto flex w-2/3 flex-col overflow-auto py-4">
      <div className="mb-4 flex gap-4">
        <div className="bg-muted/50 flex flex-1 flex-col gap-2 rounded-lg border p-4">
          <div className="flex items-center justify-center gap-2">
            <Heart className="h-5 w-5" />
            <span className="text-lg">平均每月</span>
          </div>
          <div className="flex items-end justify-center gap-2 text-center *:font-[DINPro]">
            <span className="text-3xl">{averageMonthlyAmount.toFixed(2)}</span>
            <span className="text-xl">CNY</span>
          </div>
        </div>
        <div
          className="bg-muted/50 **:cursor-pointer group flex flex-1 cursor-pointer flex-col justify-center gap-2 rounded-lg border p-4"
          onClick={async () => {
            if (
              await Dialog.confirm(
                "heads up!",
                "此列表并不是实时更新的，开发者将在您捐赠后的下一个版本中手动更新此列表",
              )
            ) {
              await open("https://2y.nz/pgdonate");
            }
          }}
        >
          <div className="flex items-center justify-center gap-2">
            <ExternalLink className="h-5 w-5" />
            <span className="text-lg">前往捐赠页面</span>
          </div>
          <div className="flex items-end justify-center gap-2 text-center">
            <span className="underline-offset-4 group-hover:underline">2y.nz/pgdonate</span>
          </div>
        </div>
      </div>

      <div className="columns-1 gap-4 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5">
        {donations.map((donation, index) => (
          <Donation
            key={index}
            user={donation.user}
            note={donation.note}
            amount={donation.amount}
            currency={donation.currency}
          />
        ))}
      </div>
    </div>
  );
}

function Donation({
  user,
  note = "",
  amount,
  currency = "CNY",
}: {
  user: string;
  note?: string;
  amount: number;
  currency?: string;
}) {
  return (
    <div
      className="bg-muted/50 mb-4 inline-flex w-full break-inside-avoid flex-col gap-2 rounded-lg border p-4"
      style={{ pageBreakInside: "avoid" }}
    >
      <div className="flex items-center gap-2">
        <User className="h-4 w-4" />
        <span className="text-sm font-medium">{user || "匿名"}</span>
      </div>

      <div className="flex items-end justify-between">
        <div className="flex items-center gap-1 *:font-[DINPro]">
          <span className="text-lg font-bold">{amount}</span>
          <span className="text-muted-foreground text-sm">{currency}</span>
        </div>
      </div>

      {note && <div className="text-muted-foreground bg-background/50 rounded p-2 text-sm">{note}</div>}
    </div>
  );
}
