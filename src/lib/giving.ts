import fundsJson from '@/data/givingFunds.json'
import bankJson from '@/data/bankAccounts.json'

export type Fund = { slug:string; name:string; desc:string; purpose:string }
export type BankAcct = { fundSlug:string; bankName:string; accountName:string; accountNo:string; currency:string; active:boolean; instructions?:string }

export function getFunds(): Fund[] { return fundsJson as any }
export function getFund(slug:string){ return getFunds().find(f=>f.slug===slug) }
export function getBankAccounts(fundSlug?: string): BankAcct[] {
  const all = (bankJson as any).accounts as BankAcct[]
  return fundSlug ? all.filter(a=>a.fundSlug===fundSlug) : all
}
export function getNotice(){ return (bankJson as any).notice as string }
