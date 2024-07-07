export default function Guest({ children }) {
    return (
        <div className="min-h-screen sm:flex sm:flex-col justify-center pt-6 sm:pt-0 ">
            <div className="flex justify-center gap-12">
                <div className="w-full sm:max-w-md mt-6 px-6 py-4 overflow-hidden sm:rounded-lg">
                    {children}
                </div>
                <div className="hidden bg-muted lg:block my-auto">
                    <img
                        src="/welcome.png"
                        alt="Image"
                        width="500"
                        height="500"
                    />
                    <div className="text-center w-[600px]">
                        <h1 className="font-semibold text-lg">
                            Temukan Bahan Makanan dan Berbagai Kebutuhan Rumah
                            Tangga di Pasar Terdekat
                        </h1>
                        <p className="mt-3">
                            Gabung sekarang untuk berbelanja tanpa keluar rumah
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
