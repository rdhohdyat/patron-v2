
export default function StoreNotFound() {
    const EmptyProductImage = () => {
        return <img src="/search_notfound.png" className="w-[350px]" />;
    };
    return (
        <div className="flex items-center pb-5 justify-center">
            <div className="text-center w-[250px] sm:w-[300px]">
                <EmptyProductImage></EmptyProductImage>
                <h1 className="text-gray-600 sm:text-xl font-bold mt-5">
                   Tidak ada toko yang ditemukan 
                </h1>
            </div>
        </div>
    );
}
